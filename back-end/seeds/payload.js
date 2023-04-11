/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('payload').del()
  await knex('payload').insert([
    {
      user_id: 2,
      weight_tons: 13,
      orbital_requirement: 'LEO',
    }
  ]);
};
