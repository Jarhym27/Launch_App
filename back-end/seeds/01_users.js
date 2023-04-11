/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      organization:'Rebel Alliance',
      username: 'Theg0atedOne',
      password: 'leiawasstillhot',
      role:'payload_user',
    },
    {
      organization: 'SpaceX',
      username: "ModernEdison",
      password: "stoleitfromtesla6969",
      role: 'lsp_user'
    }
  ]);
};
