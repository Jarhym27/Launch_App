/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_pads',table =>{
        table.increments('id')
        table.foreign('launch_vehicle_id').references('launch_vehicles')
        table.foreign('lsp_id').references('users')
        table.enum('launch_site',['Vandenburg','Cape Canaveral','Wallops Island'])
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
