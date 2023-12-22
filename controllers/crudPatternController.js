const add = (model, newData) => model.create(newData);
const find = (model) => model.find();
const findById = (model,id) => model.findById({ _id: id });
const remove = async (model, id) => await model.remove({ _id: id });
const update = async (model, id, newData) => await model.findAndUpdate(id, newData,{ new: true });
module.exports = {
  add,
  find,
  findById,
  remove,
  update,
};