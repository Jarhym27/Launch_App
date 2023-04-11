/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_vehicles').del()
  await knex('launch_vehicles').insert([
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:72,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'booked',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:82,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'booked',
      launch_pad_id: 3
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:80,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available',
      launch_pad_id: 6
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:100,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available',
      launch_pad_id: 16
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:120,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available',
      launch_pad_id: 16
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:185,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:75,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available',
      launch_pad_id: 6
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:56,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available',
      launch_pad_id: 16
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:85,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available',
      launch_pad_id: 3
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:89,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available',
      launch_pad_id: 3
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:95,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:58,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:66,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 17
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:68,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 15
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:64,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 17
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:97,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 7
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:91,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 8
    },
    {
      lsp_user_id: 5,
      launch_vehicle:'Electron',
      cost:71,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 18
    },
    {
      lsp_user_id: 5,
      launch_vehicle:'Electron',
      cost:71,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 18
    },
    {
      lsp_user_id: 7,
      launch_vehicle:'Firefly Alpha',
      cost:43,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 12
    },
    {
      lsp_user_id: 6,
      launch_vehicle:'New Glenn',
      cost:43,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 9
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Rocket 2.0',
      cost:20,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 13
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Terran R',
      cost:78,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available',
      launch_pad_id: 4
    },
  ]);
};
