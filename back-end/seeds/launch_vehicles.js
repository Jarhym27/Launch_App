/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_vehicles').del()
  await knex('launch_vehicles').insert([
    {
      orbital_capacity:'Low Earth Orbit',
      launch_vehicle:'Falcon 9',
      cost:72,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
    }
  ]);
};
