// Create
exports.create = async (Type, data) => {
  let response = {};
    var newType = new Type({ ...data });
    await newType
      .save()
      .then(() => {
        response.status = 201;
        response.id = newType._id.toString();
        response.success = true;
        response.message = `${Type.modelName} created successfully`;
      })
      .catch((err) => {
        response.status = 500;
        response.success = false;
        response.message = "something went wrong";
      });
    return { ...response };
  };
  // Read All
  exports.readAll = async (Type) => {
    let response = {};
    const result = await Type.find({});
    if (result) {
      response.status = 200;
      response.success = true;
      response.data = result;
    } else {
      response.status = 500;
      response.success = false;
      response.message = "error database";
    }
    return { ...response };
  };
  // Update
  exports.updateOne = async (Type, id, data) => {
    let response = {};
    const result = await Type.findByIdAndUpdate({ _id: id }, { $set: { ...data } },{new:true});
    if (result) {
      response.status = 201;
      response.success = true;
      response.message = `${Type.modelName} updated`;
    } else {
      response.status = 400;
      response.success = false;
      response.message = "No such document";
    }
    return { ...response };
};
  // Read One
  exports.readOne = async (Type, data) => {
    let response = {};
    try {
      const result = await Type.findOne(data);
      if (result) {
        response.status = 200;
        response.success = true;
        response.data = result;
      } else {
        response.status = 400;
        response.success = false;
        response.message = "No such document";
      }
    } catch (err) {
      if (err.kind === "ObjectId") {
        response.status = 400;
        response.success=true
        response.message = "Bad request";
      } else {
        response.status = 500;
        response.success = false;
        response.message = "Something went wrong";
      }
    }
    return { ...response };
  };
  // Delete One
  exports.deleteOne = async (Type, id) => {
    let response = {};
    const result = await Type.findOneAndDelete({ _id: id });
    if (result) {
      response.status = 200;
      response.success=true
      response.message = `${Type.modelName} deleted`;
    } else {
      response.status = 400;
      response.success = false;
      response.message = "No such document";
    }
    return { ...response };
};