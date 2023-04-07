/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('calendar', table =>{
    table.increments('id')
    table.foreign('user_id').references('users')
    table.foreign('launch_site_id').references('launch_sites')
    table.boolean('maintenance')
    table.boolean('bad_weather')
    table.date('launch_window_start')
    table.date('launch_window_end')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('calendar');
};
