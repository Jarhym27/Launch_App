/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_requests', table=>{
        table.increments('id')
        table.foreign('launch_vehicle_id').references('launch_vehicles')
        table.foreign('launch_pad_id').references('launch_pads')
        table.integer('requested_cost')
        table.date('request_date')
        table.enum('status',['Denied','Pending','Scheduled','Launched'])
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
