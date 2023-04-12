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
      password: '$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy',
      role:'payload_user',
    },
    {
      organization:'Delta 4',
      username: 'del4',
      password: '$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy',
      role:'payload_user',
    },
    {
      organization:'Delta 2',
      username: 'del2',
      password: '$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy',
      role:'payload_user',
    },
    {
      organization: 'United Launch Alliance',
      username: "ula",
      password: "$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy",
      role: 'lsp_user'
    },
    {
      organization: 'Rocket Lab',
      username: "rocket",
      password: "$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy",
      role: 'lsp_user'
    },
    {
      organization: 'Blue Origin',
      username: "borigin",
      password: "$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy",
      role: 'lsp_user'
    },
    {
      organization: 'Firefly Aerospace',
      username: "ffas",
      password: "$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy",
      role: 'lsp_user'
    },
    {
      organization: 'SpaceX',
      username: "ModernEdison",
      password: "$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy",
      role: 'lsp_user'
    },
    {
      organization: 'Relativity Space',
      username: "relativity",
      password: "$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy",
      role: 'lsp_user'
    },
    {
      organization: 'Astra',
      username: "astra",
      password: "$2a$10$oALz3ZARcEoKwIcPxuBh6.XUlo44MzkN6YpmzMx3Sinmhes.BiQKy",
      role: 'lsp_user'
    },
  ]);
};
