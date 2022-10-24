const Dogs = require("./dogs");
const Categories = require("./categories");
const Origins = require("./origins");
const Sizes = require("./sizes");
const DogBelongsToCategories = require("./dogBelongsToCategories");
const DogFromOrigins = require("./dogFromOrigins");
const DogHasSize = require("./dogHasSize");
// Dogs
Dogs.hasMany(Categories, {foreignKey: "cid", sourceKey: "id"});
Dogs.hasMany(Origins, {foreignKey: "oid", sourceKey: "id"});
Dogs.hasOne(Sizes, {foreignKey: "sid", sourceKey: "id"});


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