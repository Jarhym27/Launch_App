/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_vehicles',table => {
        table.increments('id')
        table.string('launch_vehicle')
        table.integer('cost')
        table.integer('meo_weight')
        table.integer('leo_weight')
        table.integer('geo_weight')
        table.integer('heo_weight')
        table.enu('booked_status',['booked','available'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('launch_vehicles');
};
