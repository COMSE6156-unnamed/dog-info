const getDog = `
SELECT dogs.id, dogs.name, sizes.name AS size, dogs.image_url, dogs.pronunciation_url
FROM dogs, sizes, dogHasSizes
WHERE dogs.id = :id AND
    dogs.id = dogHasSizes.did AND sizes.id = dogHasSizes.sid;
`

const getDogs = `
SELECT dogs.id, dogs.name, sizes.name AS size, dogs.image_url, dogs.pronunciation_url
FROM dogs, sizes, dogHasSizes
WHERE dogs.id = dogHasSizes.did
    AND sizes.id = dogHasSizes.sid;
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

const sql = {
    getDog,
    getDogs,
    getDogCategories,
    getDogsCategories,
    getDogOrigins,
    getDogsOrigins
};

module.exports = sql;