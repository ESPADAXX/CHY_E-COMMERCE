const {create} = require('../../../middlewares/crudPattern')
const Product = require('../../../models/Product')
// CREATE NEW
exports.create = async (req, res) => {
    const response = await create(Product, req.body);
    res.status(201).json(response)
};

// GET ALL
exports.readAll = async (req, res) => {
    console.log("Product Controller, read all ")
    res.json('everything is okay')
};

// UPDATE ONE
exports.update = async (req, res) => {
    console.log("Product Controller, update one ")
    res.json('everything is okay')
};

// GET One
exports.readOne = async (req, res) => {
    console.log("Product Controller, read one ")
    res.json('everything is okay')
};

// DELETE ONE
exports.remove = async (req, res) => {
    console.log("Product Controller, remove one ")
    res.json('everything is okay')
};