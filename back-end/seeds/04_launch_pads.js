/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_pads').del()
  await knex('launch_pads').insert([
    {
      launch_vehicle_id:1,
      lsp_user_id: 2,
      city: 'Cape Canaveral',
      state: 'Florida',
      launch_site: 'Patrick SFB',
      launch_pad: '39A',
      pad_status: true
    },
    
  ]);
};
