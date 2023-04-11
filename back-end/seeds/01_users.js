/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      organization:'Delta 8',
      username: 'del8',
      password: 'a',
      role:'payload_user',
    },
    {
      organization:'Delta 4',
      username: 'del4',
      password: 'a',
      role:'payload_user',
    },
    {
      organization:'Delta 2',
      username: 'del2',
      password: 'a',
      role:'payload_user',
    },
    {
      organization: 'United Launch Alliance',
      username: "ula",
      password: "a",
      role: 'lsp_user'
    },
    {
      organization: 'Rocket Lab',
      username: "rocket",
      password: "a",
      role: 'lsp_user'
    },
    {
      organization: 'Blue Origin',
      username: "borigin",
      password: "a",
      role: 'lsp_user'
    },
    {
      organization: 'Firefly Aerospace',
      username: "ffas",
      password: "a",
      role: 'lsp_user'
    },
    {
      organization: 'SpaceX',
      username: "ModernEdison",
      password: "a",
      role: 'lsp_user'
    },
    {
      organization: 'Relativity Space',
      username: "relativity",
      password: "a",
      role: 'lsp_user'
    },
    {
      organization: 'Astra',
      username: "astra",
      password: "a",
      role: 'lsp_user'
    },
  ]);
};
