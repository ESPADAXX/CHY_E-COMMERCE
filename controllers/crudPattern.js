const add = (model, newModel) => model.create(newModel);
const find = (model) => model.find();
const remove = async (model, id) => await model.remove({ _id: id });
const update = async (model, id, newModel) => await model.findAndUpdate(id, newModel,{ new: true });
module.exports = {
  add,
  find,
  remove,
  update,
};