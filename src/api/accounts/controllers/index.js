const {create, readAll, readOne, updateOne, deleteOne} = require('../../../middlewares/crudPattern')
const Account = require('../../../models/Account')
// CREATE NEW
exports.create = async (req, res) => {
    const response = await create(Account, req.body);
    res.status(201).json(response)
};

// GET ALL
exports.readAll = async (req, res) => {
    console.log("Account Controller, read all ")
    res.json('everything is okay')
};

// UPDATE ONE
exports.update = async (req, res) => {
    console.log("Account Controller, update one ")
    res.json('everything is okay')
};

// GET One
exports.readOne = async (req, res) => {
    let id = req.params.id;
    const response = await readOne(Account, {_id:id});
    res.status(201).json(response)
};

// DELETE ONE
exports.remove = async (req, res) => {
    console.log("Account Controller, remove one ")
    res.json('everything is okay')
};

