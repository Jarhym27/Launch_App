/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_sites').del()
  await knex('launch_sites').insert([
    {
      // launch_vehicle_id:1,
      // role_id: 1,
      // launch_date: 2023-08-15,
      // city: 'Cape Canaveral',
      // state: 'Florida'
    },
    
  ]);
};
