/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_sites',table =>{
        table.increments('id')
        table.foreign('launch_vehicle_id').references('launch_vehicles')
        //maybe keep?   vvvvvvvvvvv
        //table.string('description')
        table.foreign('user_id').references('users')
        table.date('launch_date')
        table.string('city')
        table.string('state')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('launch_sites');
};
