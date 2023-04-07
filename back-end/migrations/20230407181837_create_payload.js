/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payload',table =>{
    table.increments('id')
    table.foreign('user_id').references('users')
    table.integer('weight_tons')
    table.date('due_date')
    table.string('city')
    table.string('state')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('payload');
};
