/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_vehicles',table => {
        table.increments('id')
        table.string('orbital_capacity')
        table.boolean('reusable')
        table.integer('setup_days')
        table.integer('max_weight_tons')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('launch_vehicles');
};
