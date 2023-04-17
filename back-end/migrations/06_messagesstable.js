/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', table=>{
        table.increments('id')
        table.foreign('sender_id').references('users.id')
        table.integer('sender_id')
        table.foreign('recipient_id').references('launch_pads.id')
        table.integer('recipient_id')
        table.foreign('launch_request_id').references('launch_requests.id')
        table.integer('launch_request_id')
        table.string('message',1000)
        table.datetime('timestamp',{precision: 6})
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
};
