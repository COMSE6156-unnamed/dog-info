const getOrigin = `
SELECT origins.id, origins.name
FROM origins
WHERE origins.id = :id;
`

const sql = {
    getOrigin
};

module.exports = sql;