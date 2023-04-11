/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_vehicles').del()
  await knex('launch_vehicles').insert([
    {
<<<<<<< HEAD
    //   orbital_capacity:'Low Earth Orbit',
    //   reusable: true,
    //   setup_days: 45,
    //   max_weight: 20
     }
=======
      orbital_capacity:'Low Earth Orbit',
      launch_vehicle:'Falcon 9',
      cost:72,
      meo_weight:60,
      leo_weight:20,
      geo_weight:12,
    }
>>>>>>> 7a3e22dec98b0c1976d05c68e9d26e45038d354c
  ]);
};
