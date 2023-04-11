/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_requests').del()
  await knex('launch_requests').insert([
    {
      id: 1,
      launch_vehicle_id:1,
      launch_pad_id:1,
      launch_date: 2025-10-13,
      request_cost:18,
      status: 'Pending'
    },
  ]);
};
