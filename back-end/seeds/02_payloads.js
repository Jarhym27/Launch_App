/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('payloads').del()
  await knex('payloads').insert(
    [
      { payload_user_id: 2, weight: 29, orbital_requirement: "LEO", name: "lunar lander 12" },
      { payload_user_id: 2, weight: 18, orbital_requirement: "MEO", name: "Spy Satellite 3 " },
      { payload_user_id: 3, weight: 59, orbital_requirement: "LEO", name: "Startlink 445"},
      { payload_user_id: 2, weight: 36, orbital_requirement: "GEO", name: "GPS Sat 74"},
      { payload_user_id: 1, weight: 29, orbital_requirement: "LEO", name: "Startlink 435"},
      { payload_user_id: 1, weight: 37, orbital_requirement: "LEO", name: "Startlink 245"},
      { payload_user_id: 3, weight: 31, orbital_requirement: "LEO", name: "Startlink 322"},
      { payload_user_id: 1, weight: 56, orbital_requirement: "LEO", name: "Comm Sat 4"},
      { payload_user_id: 2, weight: 57, orbital_requirement: "LEO", name: "Comm Sat 6"},
      { payload_user_id: 1, weight: 33, orbital_requirement: "LEO", name: "Comm Sat 12"},
      { payload_user_id: 1, weight: 13, orbital_requirement: "LEO", name: "Startlink 1382"},
      { payload_user_id: 2, weight: 42, orbital_requirement: "HEO", name: "Spy Sat 38"},
      { payload_user_id: 1, weight: 58, orbital_requirement: "HEO", name: "RfG 60"},
      { payload_user_id: 2, weight: 46, orbital_requirement: "HEO", name: "Sun Blocker 19"},
      { payload_user_id: 3, weight: 15, orbital_requirement: "HEO", name: "Sun Blocker 4"},
      { payload_user_id: 1, weight: 15, orbital_requirement: "HEO", name: "Sun Blocker 45"},
      { payload_user_id: 3, weight: 14, orbital_requirement: "HEO", name: "Sun Blocker 12"},
      { payload_user_id: 3, weight: 34, orbital_requirement: "HEO", name: "Comm Sat 63"},
      { payload_user_id: 2, weight: 16, orbital_requirement: "HEO", name: "Comm Sat 53"},
      { payload_user_id: 2, weight: 55, orbital_requirement: "MEO", name: "RfG 40"},
      { payload_user_id: 2, weight: 27, orbital_requirement: "MEO", name: "Comm Sat 23"},
      { payload_user_id: 2, weight: 42, orbital_requirement: "MEO", name: "Comm Sat 78"},
      { payload_user_id: 1, weight: 52, orbital_requirement: "MEO", name: "Comm Sat 84"},
      { payload_user_id: 1, weight: 58, orbital_requirement: "MEO", name: "Comm Sat 16"},
      { payload_user_id: 3, weight: 53, orbital_requirement: "MEO", name: "Spy Sat 22"},
      { payload_user_id: 1, weight: 10, orbital_requirement: "MEO", name: "Spy Sat 77"},
      { payload_user_id: 1, weight: 41, orbital_requirement: "MEO", name: "Spy Sat 1"},
      { payload_user_id: 2, weight: 32, orbital_requirement: "GEO", name: "GPS Sat 34"},
      { payload_user_id: 3, weight: 28, orbital_requirement: "GEO", name: "GPS Sat 44"},
      { payload_user_id: 3, weight: 51, orbital_requirement: "GEO", name: "GPS Sat 54"},
      { payload_user_id: 2, weight: 59, orbital_requirement: "GEO", name: "GPS Sat 43"},
      { payload_user_id: 1, weight: 42, orbital_requirement: "GEO", name: "GPS Sat 91"},
      { payload_user_id: 2, weight: 18, orbital_requirement: "GEO", name: "GPS Sat 80"},
      { payload_user_id: 3, weight: 48, orbital_requirement: "GEO", name: "GWS"},
      { payload_user_id: 3, weight: 51, orbital_requirement: "GEO", name: "Sun Monitor 12"},
      { payload_user_id: 2, weight: 12, orbital_requirement: "GEO", name: "Sun Monitor 32"},
      { payload_user_id: 1, weight: 20, orbital_requirement: "GEO", name: "Sun Monitor 42"},
      { payload_user_id: 2, weight: 28, orbital_requirement: "GEO", name: "Sun Monitor 52"},
      { payload_user_id: 3, weight: 42, orbital_requirement: "LEO", name: "RfG 20"},
      { payload_user_id: 1, weight: 51, orbital_requirement: "LEO", name: "RfG 22"}
    ]
  );
};
