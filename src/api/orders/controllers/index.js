const { create, readAll, readOne, updateOne, deleteOne } = require('../../../middlewares/crudPattern');
const Order = require('../../../models/Order'); // Assuming you have an Order model

// Function to handle responses
const handleResponse = (res, response) => {
    if (response.success === false) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: response.message || "Bad Request",
        });
    }
    res.status(response.status).json(response);
};

// CREATE NEW
exports.create = async (req, res) => {
    try {
        const response = await create(Order, req.body);
        handleResponse(res, response);
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
        const orders = await readAll(Order);
        handleResponse(res, orders);
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
exports.update = async (req, res) => {
    try {
        const response = await updateOne(Order, req.params.id, req.body);
        handleResponse(res, response);
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
        const data ={_id:req.params.id}
        const response = await readOne(Order, data);
        handleResponse(res, response);
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
        const response = await deleteOne(Order, req.params.id);
        handleResponse(res, response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};
