/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_pads',table =>{
        table.increments('id')
        table.foreign('lsp_user_id').references('users.id')
        table.integer('lsp_user_id')
        table.string('city')
        table.string('state')
        table.enu('launch_site',['Vandenberg SFB','Patrick SFB','Wallops Flight Facility'])
        table.string('launch_pad')
        table.enu('pad_status',['Available', 'Unavailable'])
        table.timestamps(true,true)
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('launch_pads');
};
