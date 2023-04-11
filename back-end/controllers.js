const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const getAll = (table) => {
  return knex.select('*').from(`${table}`)
}

module.exports = {getAll}