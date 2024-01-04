const { create, readAll, readOne, updateOne, deleteOne } = require('../../../middlewares/crudPattern');
const Product = require('../../../models/Product')


// CREATE NEW
exports.create = async (req, res) => {
    try {
        const response = await create(Product, req.body);
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
