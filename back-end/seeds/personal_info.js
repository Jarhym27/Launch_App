/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('personal_info').del()
  await knex('personal_info').insert([
    {
      user_id:1,
      last_name: 'Hammel',
      first_name: 'Mark',
      phone_number: '634-529-8499',
      email: 'luketheone@hotmail.com',
      address: '012 Tython Road',
      city: 'Hollywood',
      state_or_province: 'California',
      postal_code:'03658',
      country: 'United States'
    },
    {
      user_id:2,
      last_name: 'Musk',
      first_name: 'Elon',
      phone_number: '777-823-5439',
      email: 'modernedison@aol.com',
      address: '720 Blazin Blvd',
      city: 'Sacremento',
      state_or_province: 'California',
      postal_code:'03696',
      country: 'United States'
    },
  ]);
};
