const { create, readAll, readOne, updateOne, deleteOne } = require('../../../middlewares/crudPattern');
const Product = require('../../../models/Product')


// CREATE NEW
exports.create = async (req, res) => {
    try {
        const response = await create(Product, req.body);
        console.log(response)
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

// GET ALL
exports.readAll = async (req, res) => {
    try {
        const products = await readAll(Product);
        if (products.success === false) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: products.message || "Bad Request",
            });
        }
        res.status(products.status).json(products);
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
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