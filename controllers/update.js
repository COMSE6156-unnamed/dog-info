const errorCheck = require("./utils/errors");
const { getDogdata } = require("./dogs");
const {
  Dogs,
  DogBelongsToCategories,
  DogFromOrigins,
  DogHasSize,
} = require("../models/models");

const update = async (req, res) => {
  let {
    name,
    id,
    size_ids,
    origin_ids,
    category_ids,
    image_url,
    pronunciation_url,
  } = req.body;

  let dog = null;
  let did = null;
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

const create = async (req, res) => {
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
    console.log(error);
    if (did) {
        await Dogs.destroy({where: {did}});
    }
    return errorCheck.errorHandler(error, res);
  }

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

  console.log(res);
  if (!res) {
    throw new Error(`${type} creation failed`);
  }

  return res;
};

const func = {
  update,
  create
};

module.exports = func;
