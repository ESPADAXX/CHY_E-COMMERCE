const {
  create,
  readAll,
  readOne,
  updateOne,
  deleteOne,
} = require("../../../middlewares/crudPattern");
const Category = require("../../../models/Category");

const {
  uploadToFbStorage,
} = require("../../../middlewares/firebaseStorage");
// CREATE NEW
exports.create = async (req, res) => {
  try {
        req.body=JSON.parse(JSON.stringify(req.body))
        req.body.isActive = Boolean(req.body.isActive)
      // Create the product in the database
        const response = await create(Category, JSON.parse(JSON.stringify(req.body)));
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
          'images/categories',
        response.id,
        "thumbnail",
        req.files["thumbnail"][0]
      );
      // Update the created product with the thumbnail image URL
      const updatedCategory = await updateOne(Category, response.id, {
        thumbnail,
      });

      if (updatedCategory.success === false) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: updatedCategory.message || "Bad Request",
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
              'images/categories',
            response.id,
            "images",
            file
            );
            listImages.push(image)
          // Optionally, you can associate imageUrl with each image in the list
        });

        await Promise.all(uploadPromises);
        }
       await updateOne(Category, response.id, {
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
    const categories = await readAll(Category);
    if (categories.success === false) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: categories.message || "Bad Request",
      });
    }
    res.status(categories.status).json(categories);
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
    const response = await updateOne(Category, req.params.id, req.body);
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
    const response = await readOne(Category, { _id: req.params.id });
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
    const response = await deleteOne(Category, req.params.id);
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
