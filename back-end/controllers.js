const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const getAll = (table) => {
  return knex.select('*').from(`${table}`)
}

const insertRow = (data,table) => {
  return knex.insert(data).into(`${table}`)
}

const deleteRow = (id,table) => {
  return knex(`${table}`).where('id', id).del()
}

module.exports = {getAll,insertRow,deleteRow}