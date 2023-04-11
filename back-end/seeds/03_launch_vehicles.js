/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_vehicles').del()
  await knex('launch_vehicles').insert([
    {
      launch_vehicle:'Falcon 9',
      cost:72,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'booked'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:82,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'booked'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:72,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:80,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:100,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:120,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:185,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:68,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:75,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon 9',
      cost:56,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
      heo_weight:30,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon Heavy',
      cost:85,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon Heavy',
      cost:56,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon Heavy',
      cost:89,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon Heavy',
      cost:95,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Falcon Heavy',
      cost:58,
      meo_weight:70,
      leo_weight:30,
      geo_weight:25,
      heo_weight:45,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:66,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:68,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:64,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:86,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:99,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:94,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:97,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:91,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
    {
      launch_vehicle:'Atlas V',
      cost:71,
      meo_weight:30,
      leo_weight:20,
      geo_weight:15,
      heo_weight:25,
      booked_status: 'available'
    },
  ]);
};
