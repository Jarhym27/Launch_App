/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('calendar').del()
  await knex('calendar').insert([
    {
    //   role_id: 1,
    // launch_site_id: 1, 
    // maintenance: true,
    // bad_weather: false,
    // launch_window_start: 2023-05-05,
    // launch_window_end: 2023-05-04
  }
    
  ]);
};
