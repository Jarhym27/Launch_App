/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_vehicles').del()
  await knex('launch_vehicles').insert([
    {
      launch_vehicle:'Falcon 9',
      cost:72,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'booked'
    }
  ]);
};
