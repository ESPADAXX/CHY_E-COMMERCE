const { create, readAll, readOne, updateOne, deleteOne } = require('../../../middlewares/crudPattern');
const Product = require('../../../models/Product')
const {uploadToFbStorage}=require('../../../middlewares/firebaseStorage')

// CREATE NEW - Create product with image upload using Multer
exports.create = async (req, res) => {
    try {
        req.body=JSON.parse(JSON.stringify(req.body))
        req.body.price = parseFloat(req.body.price)
        req.body.createdAt = new Date(req.body.createdAt)
        req.body.compareAtPrice = parseFloat(req.body.compareAtPrice)
        req.body.showFirst = Boolean(req.body.showFirst)
        req.body.isFeatured= Boolean(req.body.isFeatured)
      // Create the product in the database
        const response = await create(Product, JSON.parse(JSON.stringify(req.body)));
      if (response.success === false) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: response.message || "Bad Request",
        });
      }

      // Check if thumbnail is included in the request
      if (!req.files["thumbnail"] || req.files["thumbnail"].length === 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Thumbnail image is required.",
        });
        }
      // Upload the thumbnail image to Firebase Storage by uploadToFbStorage
        const thumbnail = await uploadToFbStorage(
          'images/products',
        response.id,
        "thumbnail",
        req.files["thumbnail"][0]
      );
      // Update the created product with the thumbnail image URL
      const updatedProduct = await updateOne(Product, response.id, {
        thumbnail,
      });

      if (updatedProduct.success === false) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: updatedProduct.message || "Bad Request",
        });
      }

      // Check if images are included in the request
      if (!req.files["images"] || req.files["images"].length === 0) {
        // Optionally handle case when no images are provided
      } else {
          // Upload the list of images to Firebase Storage
          var listImages = []
          
        const uploadPromises = req.files["images"].map(async (file, index) => {
            const image = await uploadToFbStorage(
              'images/products',
            response.id,
            "images",
            file
            );
            listImages.push(image)
          // Optionally, you can associate imageUrl with each image in the list
        });

        await Promise.all(uploadPromises);
        }
       await updateOne(Product, response.id, {
        images:listImages
      });
      res.status(response.status).json(response);

  } catch (error) {
    console.error("Error in create function:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message || "Something went wrong",
    });
  }
};
// GET ALL
exports.readAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10; // Number of products per page

        const { success, status, data } = await readAllWithPagination(Product, page, pageSize);

        if (success === false) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: data.message || 'Bad Request',
            });
        }

        res.status(status).json({ success, data });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error',
            error: error.message || 'Something went wrong',
        });
    }
};

// Helper function for readAll with pagination
const readAllWithPagination = async (model, page, pageSize) => {
    try {
        const totalProducts = await model.countDocuments();
        const totalPages = Math.ceil(totalProducts / pageSize);

        const products = await model.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return {
            success: true,
            status: 200,
            data: {
                products,
                pageInfo: {
                    currentPage: page,
                    totalPages: totalPages,
                    pageSize: pageSize,
                },
            },
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Internal Server Error',
            error: error.message || 'Something went wrong',
        };
    }
};


// UPDATE ONE
exports.updateOne = async (req, res) => {
    try {
        const response = await updateOne(Product, req.params.id, req.body);
        if (response.success === false) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: response.message || "Bad Request",
            });
        }
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

// GET ONE
exports.readOne = async (req, res) => {
    try {
        const response = await readOne(Product, { _id:req.params.id });
        if (response.success === false) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: response.message || "Bad Request",
            });
        }
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

// DELETE ONE
exports.remove = async (req, res) => {
    try {
        const response = await deleteOne(Product, req.params.id);
        if (response.success === false) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: response.message || "Bad Request",
            });
        }
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

exports.search = async (req, res) => {
    try {
        const searchTerm = req.query.s;
    
        // Use a regular expression to perform a case-insensitive search by title
        const results = await Product.find({ title: { $regex: searchTerm, $options: 'i' } });
        
        if (results.length === 0) {
            res.json({ message: 'No products found' });
        } else {
            // res.json({ success: true, data: results });
            
            const filteredProducts = results.filter(product => product.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
            const productTitles = filteredProducts.map(product => product.title);
            res.json({ success: true, data: { "title": productTitles } });
        }
    }catch (error) {
        console.error('Error in search function:', error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

// Filter by category
exports.filter= async (req, res) => {
    try {
        const filterTerm = req.query.f;

        // Use a regular expression to perform a case-insensitive search by category
        const results = await Product.find({ category: { $regex: filterTerm, $options: 'i' } });

        if (results.length === 0) {
            res.json({ message: 'No products found for the specified category' });
        } else {
            const filteredProducts = results.map(product => ({
                title: product.title,
                category: product.category,
                // Add other product properties you want to include in the response
            }));
            res.json({ success: true, data: filteredProducts });
        }
    } catch (error) {
        console.error('Error in filterByCategory function:', error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};
