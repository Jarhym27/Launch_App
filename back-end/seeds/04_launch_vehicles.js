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
      cost:67,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'available',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:70,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'available',
      launch_pad_id: 6
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:67,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'available',
      launch_pad_id: 13
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:65,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'available',
      launch_pad_id: 13
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:68,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'booked',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:70,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'available',
      launch_pad_id: 6
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:68,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'available',
      launch_pad_id: 13
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:105,
      meo_weight:8700,
      leo_weight:10500,
      geo_weight:6000,
      heo_weight:8500,
      booked_status: 'available',
      launch_pad_id: 14
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:109,
      meo_weight:8700,
      leo_weight:10500,
      geo_weight:6000,
      heo_weight:8500,
      booked_status: 'available',
      launch_pad_id: 14
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:90,
      meo_weight:17000,
      leo_weight:54400,
      geo_weight:22200,
      heo_weight:16700,
      booked_status: 'available',
      launch_pad_id: 3
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon 9',
      cost:65,
      meo_weight:14000,
      leo_weight:22800,
      geo_weight:8300,
      heo_weight:10200,
      booked_status: 'available',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:90,
      meo_weight:17000,
      leo_weight:54400,
      geo_weight:22200,
      heo_weight:16700,
      booked_status: 'available',
      launch_pad_id: 3
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:91,
      meo_weight:17000,
      leo_weight:54400,
      geo_weight:22200,
      heo_weight:16700,
      booked_status: 'available',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 8,
      launch_vehicle:'Falcon Heavy',
      cost:94,
      meo_weight:17000,
      leo_weight:54400,
      geo_weight:22200,
      heo_weight:16700,
      booked_status: 'available',
      launch_pad_id: 1
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:107,
      meo_weight:8700,
      leo_weight:10500,
      geo_weight:6000,
      heo_weight:8500,
      booked_status: 'available',
      launch_pad_id: 14
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:108,
      meo_weight:8700,
      leo_weight:10500,
      geo_weight:6000,
      heo_weight:8500,
      booked_status: 'available',
      launch_pad_id: 7
    },
    {
      lsp_user_id: 4,
      launch_vehicle:'Atlas V',
      cost:109,
      meo_weight:8700,
      leo_weight:10500,
      geo_weight:6000,
      heo_weight:8500,
      booked_status: 'available',
      launch_pad_id: 8
    },
    {
      lsp_user_id: 5,
      launch_vehicle:'Electron',
      cost:8,
      meo_weight: null,
      leo_weight: 550,
      geo_weight: null,
      heo_weight: null,
      booked_status: 'booked',
      launch_pad_id: 15
    },
    {
      lsp_user_id: 5,
      launch_vehicle:'Electron',
      cost:8,
      meo_weight: null,
      leo_weight: 750,
      geo_weight: null,
      heo_weight: null,
      booked_status: 'available',
      launch_pad_id: 15
    },
    {
      lsp_user_id: 7,
      launch_vehicle:'Firefly Alpha',
      cost:15,
      meo_weight:870,
      leo_weight:1170,
      geo_weight:null,
      heo_weight:null,
      booked_status: 'booked',
      launch_pad_id: 9
    },
    {
      lsp_user_id: 7,
      launch_vehicle:'Firefly Alpha',
      cost:17,
      meo_weight:870,
      leo_weight:1170,
      geo_weight:null,
      heo_weight:null,
      booked_status: 'available',
      launch_pad_id: 9
    },
    {
      lsp_user_id: 7,
      launch_vehicle:'Firefly Alpha',
      cost:16,
      meo_weight:870,
      leo_weight:1170,
      geo_weight:null,
      heo_weight:null,
      booked_status: 'available',
      launch_pad_id: 9
    },
    {
      lsp_user_id: 6,
      launch_vehicle:'New Glenn',
      cost:95,
      meo_weight:32500,
      leo_weight:41000,
      geo_weight:13000,
      heo_weight:32000,
      booked_status: 'available',
      launch_pad_id: 10
    },
    {
      lsp_user_id: 6,
      launch_vehicle:'New Glenn',
      cost:95,
      meo_weight:32500,
      leo_weight:41000,
      geo_weight:13000,
      heo_weight:32000,
      booked_status: 'available',
      launch_pad_id: 9
    },
    {
      lsp_user_id: 6,
      launch_vehicle:'New Glenn',
      cost:90,
      meo_weight:32500,
      leo_weight:41000,
      geo_weight:13000,
      heo_weight:32000,
      booked_status: 'available',
      launch_pad_id: 10
    },
    {
      lsp_user_id: 6,
      launch_vehicle:'New Glenn',
      cost:94,
      meo_weight:32500,
      leo_weight:41000,
      geo_weight:13000,
      heo_weight:32000,
      booked_status: 'available',
      launch_pad_id: 9
    },
    {
      lsp_user_id: 10,
      launch_vehicle:'Rocket 2.0',
      cost:3,
      meo_weight:null,
      leo_weight:600,
      geo_weight:null,
      heo_weight:null,
      booked_status: 'available',
      launch_pad_id: 8
    },
    {
      lsp_user_id: 10,
      launch_vehicle:'Rocket 2.0',
      cost:3,
      meo_weight:null,
      leo_weight:600,
      geo_weight:null,
      heo_weight:null,
      booked_status: 'available',
      launch_pad_id: 8
    },
    {
      lsp_user_id: 10,
      launch_vehicle:'Rocket 2.0',
      cost:4,
      meo_weight:null,
      leo_weight:610,
      geo_weight:null,
      heo_weight:null,
      booked_status: 'available',
      launch_pad_id: 8
    },
    {
      lsp_user_id: 10,
      launch_vehicle:'Rocket 2.0',
      cost:3,
      meo_weight:null,
      leo_weight:670,
      geo_weight:null,
      heo_weight:null,
      booked_status: 'available',
      launch_pad_id: 8
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Terran R',
      cost:12,
      meo_weight:16500,
      leo_weight:23000,
      geo_weight:12000,
      heo_weight:16000,
      booked_status: 'available',
      launch_pad_id: 4
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Terran R',
      cost:12,
      meo_weight:16500,
      leo_weight:23000,
      geo_weight:12000,
      heo_weight:16000,
      booked_status: 'available',
      launch_pad_id: 4
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Terran R',
      cost:12,
      meo_weight:16500,
      leo_weight:23000,
      geo_weight:12000,
      heo_weight:16000,
      booked_status: 'available',
      launch_pad_id: 4
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Terran R',
      cost:14,
      meo_weight:16500,
      leo_weight:23000,
      geo_weight:12000,
      heo_weight:16000,
      booked_status: 'available',
      launch_pad_id: 4
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Terran R',
      cost:13,
      meo_weight:16500,
      leo_weight:23000,
      geo_weight:12000,
      heo_weight:16000,
      booked_status: 'available',
      launch_pad_id: 4
    },
    {
      lsp_user_id: 9,
      launch_vehicle:'Terran R',
      cost:12,
      meo_weight:16500,
      leo_weight:23000,
      geo_weight:12000,
      heo_weight:16000,
      booked_status: 'available',
      launch_pad_id: 4
    },
  ]);
};
