/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_pads',table =>{
        table.increments('id')
        table.foreign('launch_vehicle_id').references('launch_vehicles.id')
        table.integer('launch_vehicle_id')
        table.foreign('lsp_user_id').references('users.id')
        table.integer('lsp_user_id')
        table.string('city')
        table.string('state')
        table.enu('launch_site',['Vandenberg SFB','Patrick SFB','Wallops Island'])
        table.string('launch_pad')
        table.boolean('pad_status')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('launch_pads');
};
