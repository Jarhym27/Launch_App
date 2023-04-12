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

const updateRow = (id,body,table) => {
  let updatedBody = {
    ...body,
    updated_at: new Date().toISOString()
  }
  return knex(`${table}`).where('id', id).update(updatedBody)
}

module.exports = {getAll,insertRow,deleteRow,updateRow}