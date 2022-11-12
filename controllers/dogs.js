const Sequelize = require("sequelize");
const sql = require("./sql/dogs");
const sequelize = require("../util/database");
const format = require("./utils/format");
const errorCheck = require("./utils/errors");
const constants = require("../util/constants");

const getAllDogsInfo = async (req, res) => {
  try {
    const limit = req.query.limit
      ? Math.min(constants.defaultPageSize, parseInt(req.query.limit))
      : constants.defaultPageSize;
    let offset = req.query.offset
      ? parseInt(req.query.offset)
      : constants.defaultOffset;

    let dogs = await sequelize.query(sql.getDogsWithLimit, {
      replacements: { limit: limit, offset: offset },
      type: Sequelize.QueryTypes.SELECT,
    });
    let dogNum = dogs.length;

    const maxid = dogs.reduce(
      (max, dog) => (dog.id > max ? dog.id : max),
      dogs[0].id
    );
    const minid = dogs.reduce(
      (min, dog) => (dog.id < min ? dog.id : min),
      dogs[0].id
    );

    const categories = await sequelize.query(sql.getDogsCategoriesWithRange, {
      replacements: { minid: minid, maxid: maxid },
      type: Sequelize.QueryTypes.SELECT,
    });
    const origins = await sequelize.query(sql.getDogsOriginsWithRange, {
      replacements: { minid: minid, maxid: maxid },
      type: Sequelize.QueryTypes.SELECT,
    });
    const sizes = await sequelize.query(sql.getDogsSizesWithRange, {
      replacements: { minid: minid, maxid: maxid },
      type: Sequelize.QueryTypes.SELECT,
    });

    const categoryMap = new Map();
    if (!dogs || !categories || !origins) {
      throw new Error("LOAD_DOGS_ERROR");
    }
    categories.forEach((category) => {
      if (!categoryMap.has(category.did)) {
        categoryMap.set(category.did, []);
      }
      categoryMap
        .get(category.did)
        .push({ id: category.cid, name: category.cname });
    });

    const originMap = new Map();
    origins.forEach((origin) => {
      if (!originMap.has(origin.did)) {
        originMap.set(origin.did, []);
      }
      originMap.get(origin.did).push({ id: origin.oid, name: origin.oname });
    });

    const sizeMap = new Map();
    sizes.forEach((size) => {
      sizeMap.set(size.did, { id: size.sid, name: size.sname });
    });

    // compute paths
    const paginationLinks = getPaginationLinks(limit, offset, dogNum);
    dogs = format.dogsFormat(dogs, categoryMap, originMap, sizeMap);
    return res.status(200).json({ data: dogs, links: paginationLinks });
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }
};

const getDog = async (req, res) => {
  try {
    const id = req.params.id;
    const dog = await getDogdata(id);
    return res.status(200).json(dog);
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }
};

const getDogdata = async (id) => {
  const dogs = await sequelize.query(sql.getDog, {
    replacements: {
      id: id,
    },
    type: Sequelize.QueryTypes.SELECT,
  });

  if (dogs.length < 1) {
    throw new Error("DOG_NOT_EXIST");
  }

  let dog = dogs.at(0);
  const categories = await sequelize.query(sql.getDogCategories, {
    replacements: { id: id },
    type: Sequelize.QueryTypes.SELECT,
  });

  const origins = await sequelize.query(sql.getDogOrigins, {
    replacements: { id: id },
    type: Sequelize.QueryTypes.SELECT,
  });

  const sizes = await sequelize.query(sql.getDogSize, {
    replacements: { id: id },
    type: Sequelize.QueryTypes.SELECT,
  });
  const size = sizes.at(0);
  dog = format.dogFormat(dog, categories, origins, size);
  return dog;
};

const getDogCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const categories = await sequelize.query(sql.getDogCategories, {
      replacements: { id: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    if (categories.length < 1) {
      throw new Error("DOG_NOT_EXIST");
    }

    return res.status(200).json(format.categoriesFormat(categories));
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }
};

const getDogOrigins = async (req, res) => {
  try {
    const id = req.params.id;
    const origins = await sequelize.query(sql.getDogOrigins, {
      replacements: { id: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    if (origins.length < 1) {
      throw new Error("DOG_NOT_EXIST");
    }
    return res.status(200).json(format.originsFormat(origins));
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }
};

const getDogSize = async (req, res) => {
  try {
    const id = req.params.id;
    const sizes = await sequelize.query(sql.getDogSize, {
      replacements: { id: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    if (sizes.length < 1) {
      throw new Error("DOG_NOT_EXIST");
    }
    const size = sizes.at(0);
    return res.status(200).json(size);
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }
};

const getDogImageUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const image_urls = await sequelize.query(sql.getDogImageUrl, {
      replacements: { id: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    if (image_urls.length < 1) {
      throw new Error("DOG_NOT_EXIST");
    }
    const image_url = image_urls.at(0);
    return res.status(200).json(image_url);
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }
};

const getDogPronunciationUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const pronunciation_urls = await sequelize.query(
      sql.getDogPronunciationUrl,
      {
        replacements: { id: id },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    if (pronunciation_urls.length < 1) {
      throw new Error("DOG_NOT_EXIST");
    }

    const pronunciation_url = pronunciation_urls.at(0);
    return res.status(200).json(pronunciation_url);
  } catch (error) {
    console.log(error);
    return errorCheck.errorHandler(error, res);
  }
};

function getPaginationLinks(limit, offset, dogNum) {
  const pathBase = constants.serverEndpoint + constants.dogsRoute;
  const currPath = pathBase + `?limit=${limit}&offset=${offset}`;
  const prevPath =
    pathBase + `?limit=${limit}&offset=${Math.max(0, offset - limit)}`;
  const nextPath =
    pathBase + `?limit=${limit}&offset=${dogNum < limit ? offset : (offset + limit)}`;
  
  const curr = getPaginationLinkObject(
    constants.paginationRelationCurrent,
    currPath
  );
  const prev = getPaginationLinkObject(
    constants.paginationRelationPrev,
    prevPath
  );
  const next = getPaginationLinkObject(
    constants.paginationRelationNext,
    nextPath
  );

  return { curr, prev, next };
}

function getPaginationLinkObject(relation, path) {
  return { rel: relation, href: path };
}

const func = {
  getAllDogsInfo,
  getDog,
  getDogCategories,
  getDogOrigins,
  getDogSize,
  getDogImageUrl,
  getDogPronunciationUrl,
  getDogdata,
};

module.exports = func;
