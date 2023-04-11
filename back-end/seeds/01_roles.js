/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {
    //   launch_user: false,
    //   payload_user: true
    // },
    // {
    //   launch_user: true,
    //   payload_user: false
    }
  ]);
};
