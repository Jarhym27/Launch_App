/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_requests').del()
  await knex('launch_requests').insert([
    {
      payload_id: 1,
      launch_pad_id:1,
      launch_vehicle_id:1,
      request_status: 'Pending',
      launch_date: '2025-10-13',
      request_cost:18
    },
  ]);
};
