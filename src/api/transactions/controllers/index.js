const { create, readAll, readOne, updateOne, deleteOne } = require('../../../middlewares/crudPattern');
const Transaction = require('../../../models/Transaction')

// CREATE NEW
exports.create = async (req, res) => {
    try {
        const response = await create(Transaction, req.body);
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
        const transactions = await readAll(Transaction);
        if (transactions.success === false) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: transactions.message || "Bad Request",
            });
        }
        res.status(transactions.status).json(transactions);
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
        const response = await updateOne(Transaction, req.params.id, req.body);
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
        const response = await readOne(Transaction, { _id:req.params.id });
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
        const response = await deleteOne(Transaction, req.params.id);
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