/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('payloads').del()
  await knex('payloads').insert([
    {
      payload_user_id: 2,
      weight: 13,
      orbital_requirement: 'LEO',
    }
  ]);
};
