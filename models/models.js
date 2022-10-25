const Dogs = require("./dogs");
const Categories = require("./categories");
const Origins = require("./origins");
const Sizes = require("./sizes");
const DogBelongsToCategories = require("./dogBelongsToCategories");
const DogFromOrigins = require("./dogFromOrigins");
const DogHasSize = require("./dogHasSize");
// Dogs
Dogs.hasMany(DogBelongsToCategories, {foreignKey: "did", sourceKey: "id"});
Dogs.hasMany(DogFromOrigins, {foreignKey: "did", sourceKey: "id"});
Dogs.hasOne(DogHasSize, {foreignKey: "did", sourceKey: "id"});

// Categories
Categories.hasMany(DogBelongsToCategories, {foreignKey: "cid", sourceKey: "id"});

// Origins
Origins.hasMany(DogFromOrigins, {foreignKey: "oid", sourceKey: "id"});

// Size
Sizes.hasOne(DogHasSize, {foreignKey: "sid", sourceKey: "id"});

const models = {
    Dogs,
    Categories,
    Origins,
    Sizes,
    DogBelongsToCategories,
    DogFromOrigins,
    DogHasSize
};

module.exports = models;