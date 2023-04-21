const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const getAll = (table) => {
  return knex.select('*').from(`${table}`)
}

const insertRow = (data,table) => {
  if(table==='messages'){
    let updatedData = {
      ...data,
      timestamp: new Date().toISOString()
    }
    return knex.returning('*').insert(updatedData).into(`${table}`)
  } else if(table==='launch_vehicles') {
    let updatedData = {
      ...data,
      updated_at: new Date().toISOString(),
      icon: 'Falcon_9_icon.png',
      picture: 'falcon_9.jpg'
    }
    return knex.returning('*').insert(updatedData).into(`${table}`)
  } else {
    let updatedData = {
      ...data,
      updated_at: new Date().toISOString()
    }
    return knex.returning('*').insert(updatedData).into(`${table}`)
  }
}

const deleteRow = (id,table) => {
  return knex(`${table}`).where('id', id).del()
}

const updateRow = (id,body,table) => {
  if(table==='messages'){
    return knex(`${table}`).returning('*').where('id', id).update(body)
  } else {
    let updatedBody = {
      ...body,
      updated_at: new Date().toISOString()
    }
    return knex(`${table}`).returning('*').where('id', id).update(updatedBody)
  }
}

module.exports = {getAll,insertRow,deleteRow,updateRow}