export const add = (model, newModel) => model.create(newModel);
export const find = (model) => model.find();
export const remove = async (model,id) => await model.remove({ _id: id });
export const update = async (model, id, newModel) => await model.findAndUpdate(id, newModel,{ new: true });
module.exports = {
  add,
  find,
  remove,
  update,
};