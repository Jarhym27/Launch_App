/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payloads',table =>{
    table.increments('id')
    table.foreign('payload_user_id').references('users.id')
    table.integer('payload_user_id')
    table.integer('weight')
    table.enu('orbital_requirement',['GEO','LEO','MEO', 'HEO'])
    table.string('name')

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('payloads');
};
