const errorCheck = require("./utils/errors");
const { getDogdata } = require("./dogs");
const { emitEvent } = require("./utils/sns");

const {
  Dogs,
  DogBelongsToCategories,
  DogFromOrigins,
  DogHasSize,
  Origins,
  Categories,
  Sizes,
} = require("../models/models");

const update_dog = async (req, res) => {
  let {
    name,
    size_ids,
    origin_ids,
    category_ids,
    image_url,
    pronunciation_url,
  } = req.body;
  let id = req.params.id

  let dog = null;
  
  try {
    // if id exists, we update the existing ones
    // else create new ones

    if (!id){
      throw new Error("ID_NOT_DEFINITED");
    }

    dog = await Dogs.findOne({where:{id}});
    if (!dog) {
      throw new Error("DOG_NOT_FOUND");
    }
    dog = await dog.update({
      name,
      image_url,
      pronunciation_url,
    });
    if (!dog) {
      throw new Error("DOG_UPDATE_FAILED");
    }

    let dog_sizes = size_ids.map((sid) => ({
      did: dog.id,
      sid,
    }));
    await create_dog_metadata(dog_sizes, "size");

    let dog_categories = category_ids.map((cid) => ({
      did: dog.id,
      cid,
    }));
    await create_dog_metadata(dog_categories, "category");

    let dog_origins = origin_ids.map((oid) => ({
      did: dog.id,
      oid,
    }));
    await create_dog_metadata(dog_origins, "origin");


    dog = dog ? await getDogdata(dog.id) : { message: "create/update failed" };
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }

  return res.status(200).json(dog);
};

const create_dog = async (req, res) => {
  let {
    name,
    size_ids,
    origin_ids,
    category_ids,
    image_url,
    pronunciation_url,
  } = req.body;

  let dog = null;
  let did = null;
  try {
    dog = {
      name,
      image_url,
      pronunciation_url,
    };
    dog = await Dogs.create(dog);
    if (!dog) {
      throw new Error("CREATE_DOG_FAILED");
    }
    did = dog.id;

    let dog_sizes = size_ids.map((sid) => ({
      did: dog.id,
      sid,
    }));
    await create_dog_metadata(dog_sizes, "size");

    let dog_categories = category_ids.map((cid) => ({
      did: dog.id,
      cid,
    }));
    await create_dog_metadata(dog_categories, "category");

    let dog_origins = origin_ids.map((oid) => ({
      did: dog.id,
      oid,
    }));
    await create_dog_metadata(dog_origins, "origin");
    
    dog = dog ? await getDogdata(dog.id) : { message: "create failed" };
  } catch (error) {
    // console.log(error);
    if (did) {
        await Dogs.destroy({where: {id: did}});
    }
    return errorCheck.errorHandler(error, res);
  }
  emitEvent(dog);
  return res.status(200).json(dog);
};


const create_dog_metadata = async (data, type) => {
  if (data.length == 0) return null;

  const did = data[0].did;
  let res = null;

  if (type == "size") {
    await DogHasSize.destroy({where: {did}});
    res = await DogHasSize.bulkCreate(data);
  } else if (type == "category") {
    await DogBelongsToCategories.destroy({where: {did}});
    res = await DogBelongsToCategories.bulkCreate(data);
  } else if (type == "origin") {
    await DogFromOrigins.destroy({where: {did}});
    res = await DogFromOrigins.bulkCreate(data);
  }

  if (!res) {
    throw new Error(`${type} creation failed`);
  }

  return res;
};

const create_origin = async (req, res) => {
  let { name } = req.body;
  return create_metadata("origin", res, name);
}

const update_origin = async (req, res) => {
  let { name } = req.body;
  let id = req.params.id
  return update_metadata("origin", res, name, id)
}

const create_category = async (req, res) => {
  let { name } = req.body;
  return create_metadata("category", res, name);
}

const update_category = async (req, res) => {
  let { name } = req.body;
  let id = req.params.id
  return update_metadata("category", res, name, id)
}

const create_size = async (req, res) => {
  let { name } = req.body;
  return create_metadata("size", res, name);
}

const update_size = async (req, res) => {
  let { name } = req.body;
  let id = req.params.id
  return update_metadata("size", res, name, id)
}

const create_metadata = async (type, res, name) => {

  let metadata = null;
  let metadata_id = null;
  let metadata_object = null;
  let metadata_string = null;
  if (type == "size") {
    metadata_object = Sizes;
    metadata_string = "SIZE";
  } else if (type == "category") {
    metadata_object = Categories;
    metadata_string = "CATEGORY";
  } else if (type == "origin") {
    metadata_object = Origins;
    metadata_string = "ORIGIN"
  }
    
  try {
    all_metadata = await metadata_object.findAll({attributes: ["name"]});
    all_metadata = all_metadata.map(({ dataValues }) => dataValues["name"])
    if (all_metadata.includes(name)) {
      throw new Error(metadata_string + "_ALREADY_EXISTS");
    }

    metadata = { name };
    metadata = await metadata_object.create(metadata);
    if (!metadata) {
      throw new Error("CREATE_" + metadata_string + "_FAILED");
    }
    metadata_id = metadata.id;
  } catch (error) {
    if (metadata_id) {
      await metadata_object.destroy({where: {id: metadata_id}});
    }
    return errorCheck.errorHandler(error, res);
  }
  
  return res.status(200).json(metadata);
}

const update_metadata = async (type, res, name, id) => {
  let metadata = null;
  let metadata_string = null;
  if (type == "size") {
    metadata_object = Sizes;
    metadata_string = "SIZE";
  } else if (type == "category") {
    metadata_object = Categories;
    metadata_string = "CATEGORY";
  } else if (type == "origin") {
    metadata_object = Origins;
    metadata_string = "ORIGIN"
  }
  
  try {
    // if id exists, we update the existing ones
    if (!name) {
      throw new Error("NAME_NOT_DEFINED")
    }

    if (!id){
      throw new Error("ID_NOT_DEFINED");
    }

    metadata = await metadata_object.findOne({where:{id}});
    if (!metadata) {
      throw new Error(metadata_string + "_NOT_FOUND");
    }
    metadata = await metadata.update({
      name,
    });

    if (!metadata) {
      throw new Error(metadata_string + "_UPDATE_FAILED");
    }
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }

  return res.status(200).json(metadata);
}

const delete_dog = async (req, res) => {
  return await delete_data('dog', req.params.id, res);
}

const delete_size = async (req, res) => {
  return await delete_data('size', req.params.id, res);
}

const delete_origin = async (req, res) => {
  return await delete_data('origin', req.params.id, res);
}

const delete_category = async (req, res) => {
  return await delete_data('category', req.params.id, res);
}

const delete_data = async(type, id, res) => {

  let metadata = null;
  let metadata_string = null;
  if (type == "size") {
    metadata_object = Sizes;
    metadata_string = "SIZE";
  } else if (type == "category") {
    metadata_object = Categories;
    metadata_string = "CATEGORY";
  } else if (type == "origin") {
    metadata_object = Origins;
    metadata_string = "ORIGIN"
  } else if (type == 'dog') {
    metadata_object = Dogs;
    metadata_string = "DOG"
  }

  try {
    if (!type) {
      throw new Error("TYPE_NOT_DEFINED")
    }

    if (!id){
      throw new Error("ID_NOT_DEFINED");
    }
    metadata = await metadata_object.findOne({where:{id}});
    if (!metadata) {
      throw new Error(metadata_string + "_NOT_FOUND");
    }
    metadata.destroy();

  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }

  return res.status(200).json({message: "success"});
}

const func = {
  update_dog,
  create_dog,
  create_origin,
  update_origin,
  create_category,
  update_category,
  create_size,
  update_size,
  delete_dog,
  delete_size,
  delete_category,
  delete_origin
};

module.exports = func;
