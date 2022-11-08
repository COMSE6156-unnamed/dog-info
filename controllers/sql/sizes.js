const getSize = `
SELECT sizes.id, sizes.name
FROM sizes
WHERE sizes.id = :id;
`

const sql = {
    getSize
};

module.exports = sql;