const errorCheck = require("./utils/errors");
const { getDogdata } = require("./dogs");
const {
  Dogs,
  DogBelongsToCategories,
  DogFromOrigins,
  DogHasSize,
  Origins
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
    // console.log(error);
    if (did) {
        await Dogs.destroy({where: {id: did}});
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

  if (!res) {
    throw new Error(`${type} creation failed`);
  }

  return res;
};

const create_origin = async (req, res) => {
  let {
    name,
  } = req.body;

  let origin = null;
  let oid = null;
  try {
    all_origins = await Origins.findAll({attributes: ["name"]});
    all_origins = all_origins.map(({ dataValues }) => dataValues["name"])
    if (all_origins.includes(name)) {
      throw new Error("ORIGIN_ALREADY_EXISTS");
    }

    origin = { name };
    origin = await Origins.create(origin);
    if (!origin) {
      throw new Error("CREATE_ORIGIN_FAILED");
    }
    oid = origin.id;
  } catch (error) {
    if (oid) {
      await Origins.destroy({where: {id: oid}});
    }
    return errorCheck.errorHandler(error, res);
  }
  
  return res.status(200).json(origin);
}

const update_origin = async (req, res) => {
  let {
    name,
    id,
  } = req.body;

  let origin = null;
  let oid = null;
  try {
    // if id exists, we update the existing ones
    // else create new ones

    if (!id){
      throw new Error("ID_NOT_DEFINITED");
    }

    origin = await Origins.findOne({where:{id}});
    if (!origin) {
      throw new Error("ORIGIN_NOT_FOUND");
    }
    origin = await origin.update({
      name,
    });

    if (!origin) {
      throw new Error("ORIGIN_UPDATE_FAILED");
    }
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }

  return res.status(200).json(origin);
}

const create_category = async (req, res) => {
  
}

const update_category = async (req, res) => {
  
}

const func = {
  update,
  create,
  create_origin,
  update_origin,
};

module.exports = func;
