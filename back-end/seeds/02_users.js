/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(
    {
    //   username: 'Theg0atedOne',
    //   password: 'leiawasstillhot',
    //   role_id
    // },
    // {
    //   username: "ModernEdison",
    //   password: "stoleitfromtesla6969",
    //   role_id
    }
    );
};
