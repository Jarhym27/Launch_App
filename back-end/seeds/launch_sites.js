/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_sites').del()
  await knex('launch_sites').insert([
    {
      launch_vehicle_id:1,
      lsp_id: 2,
      city: 'Cape Canaveral',
      state: 'Florida',
      loctaion: 'Cape Canaveral Air Force Station',
    },
    
  ]);
};
