const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const getAll = (table) => {
  return knex.select('*').from(`${table}`)
}

const insertRow = (data,table) => {
  let updatedData = {
    ...data,
    timestamp: new Date().toISOString()
  }
  return knex.insert(updatedData).into(`${table}`)
}

const deleteRow = (id,table) => {
  return knex(`${table}`).where('id', id).del()
}

const updateRow = (id,body,table) => {
  if(table==='messages'){
    let updatedBody = {
      ...body,
      timestamp: new Date().toISOString()
    }
    return knex(`${table}`).where('id', id).update(updatedBody)
  } else {
    let updatedBody = {
      ...body,
      updated_at: new Date().toISOString()
    }
    return knex(`${table}`).where('id', id).update(updatedBody)
  }
}

module.exports = {getAll,insertRow,deleteRow,updateRow}