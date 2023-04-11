/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payloads',table =>{
    table.increments('id')
    table.foreign('payload_user_id').references('users')
    table.integer('weight')
    table.enum('orbital_requirement',['GEO','LEO','MEO'])

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('payload');
};
