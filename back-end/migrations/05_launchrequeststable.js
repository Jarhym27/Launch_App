/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_requests', table=>{
        table.increments('id')
        table.foreign('payload_id').references('payloads.id')
        table.integer('payload_id')
        table.foreign('launch_pad_id').references('launch_pads.id')
        table.integer('launch_pad_id')
        table.foreign('launch_vehicle_id').references('launch_vehicles.id')
        table.integer('launch_vehicle_id')
        table.enu('request_status',['Denied','Pending','Scheduled','Launched'])
        table.date('launch_date')
        table.integer('request_cost')
        table.timestamps(true,true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('launch_requests');
};
