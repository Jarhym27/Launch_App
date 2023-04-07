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
      reusable: true,
      setup_days: 45,
      max_weight: 20
    }
  ]);
};
