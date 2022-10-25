const getDog = `
SELECT dogs.id, dogs.name, dogs.image_url, dogs.pronunciation_url
FROM dogs
WHERE dogs.id = :id;
`

const getDogs = `
SELECT dogs.id, dogs.name, dogs.image_url, dogs.pronunciation_url
FROM dogs;
`

const getDogCategories = `
SELECT dogBelongsToCategories.cid AS id, categories.name
FROM dogs, categories, dogBelongsToCategories
WHERE dogs.id = :id AND
    dogs.id = dogBelongsToCategories.did AND 
    categories.id = dogBelongsToCategories.cid;
`

const getDogsCategories = `
SELECT dogs.id AS did, categories.id AS cid, categories.name AS cname
FROM dogs, dogBelongsToCategories, categories
WHERE dogs.id = dogBelongsToCategories.did AND
    categories.id = dogBelongsToCategories.cid;
`

const getDogOrigins = `
SELECT dogFromOrigins.oid AS id, origins.name AS name
FROM dogs, origins, dogFromOrigins
WHERE dogs.id = :id AND
    dogs.id = dogFromOrigins.did AND
    origins.id = dogFromOrigins.oid;
`

const getDogsOrigins = `
SELECT dogs.id AS did, origins.id AS oid, origins.name AS oname
FROM dogs, origins, dogFromOrigins
WHERE dogs.id = dogFromOrigins.did AND
    origins.id = dogFromOrigins.oid;
`

const getDogSize = `
SELECT sizes.id, sizes.name
FROM dogs, sizes, dogHasSizes
WHERE dogs.id = :id AND
    dogs.id = dogHasSizes.did AND sizes.id = dogHasSizes.sid;
`

const getDogsSizes = `
SELECT dogs.id AS did, sizes.id AS sid, sizes.name AS sname
FROM dogs, sizes, dogHasSizes
WHERE dogs.id = dogHasSizes.did AND
    sizes.id = dogHasSizes.sid;
`

const sql = {
    getDog,
    getDogs,
    getDogCategories,
    getDogsCategories,
    getDogOrigins,
    getDogsOrigins,
    getDogSize,
    getDogsSizes
};

module.exports = sql;