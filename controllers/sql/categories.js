const getCategory = `
SELECT categories.id, categories.name
FROM categories
WHERE categories.id = :id;
`

const sql = {
    getCategory
};

module.exports = sql;