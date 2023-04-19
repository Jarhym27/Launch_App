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
        table.enu('booked_status',['booked','available','launched'])
        table.foreign('launch_pad_id').references('launch_pads.id')
        table.integer('launch_pad_id')
        table.foreign('lsp_user_id').references('users.id')
        table.integer('lsp_user_id')
        table.string('picture')
        table.string('description',1000)
        table.string('link')
        table.timestamps(true,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('launch_vehicles');
};
