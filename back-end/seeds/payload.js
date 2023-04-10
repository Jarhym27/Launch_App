/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('payload').del()
  await knex('payload').insert([
    {
      // user_id: 1,
      // weight_tons: 13,
      // due_date: 2023-12-02,
      // city: 'Atlanta',
      // state: 'Georgia',
    }
  ]);
};
