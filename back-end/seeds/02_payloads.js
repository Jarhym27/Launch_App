/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('payloads').del()
  await knex('payloads').insert(
    [
      { payload_user_id: 2, weight: 3209, orbital_requirement: "LEO", name: "Lunar Lander 12" },
      { payload_user_id: 2, weight: 3450, orbital_requirement: "MEO", name: "Spy Satellite 3 " },
      { payload_user_id: 3, weight: 1200, orbital_requirement: "LEO", name: "Starlink 445"},
      { payload_user_id: 1, weight: 230, orbital_requirement: "LEO", name: "Small-Sat 3" },
      { payload_user_id: 11, weight: 400, orbital_requirement: "MEO", name: "Small-Sat 1" },
      { payload_user_id: 11, weight: 350, orbital_requirement: "LEO", name: "Small-Sat 4"},
      { payload_user_id: 2, weight: 365, orbital_requirement: "LEO", name: "Small-Sat 5" },
      { payload_user_id: 11, weight: 450, orbital_requirement: "MEO", name: "Small-Sat 6" },
      { payload_user_id: 3, weight: 200, orbital_requirement: "LEO", name: "MicroSat 12"},
      { payload_user_id: 2, weight: 1200, orbital_requirement: "GEO", name: "GPS Sat 74"},
      { payload_user_id: 1, weight: 1400, orbital_requirement: "LEO", name: "Starlink 435"},
      { payload_user_id: 1, weight: 1400, orbital_requirement: "LEO", name: "Starlink 245"},
      { payload_user_id: 3, weight: 1300, orbital_requirement: "LEO", name: "Starlink 322"},
      { payload_user_id: 11, weight: 2570, orbital_requirement: "LEO", name: "Comm Sat 4"},
      { payload_user_id: 2, weight: 4250, orbital_requirement: "LEO", name: "Comm Sat 6"},
      { payload_user_id: 1, weight: 3560, orbital_requirement: "LEO", name: "Comm Sat 12"},
      { payload_user_id: 1, weight: 1450, orbital_requirement: "LEO", name: "Starlink 1382"},
      { payload_user_id: 11, weight: 3250, orbital_requirement: "HEO", name: "Spy Sat 38"},
      { payload_user_id: 11, weight: 3679, orbital_requirement: "HEO", name: "RfG 60"},
      { payload_user_id: 2, weight: 4000, orbital_requirement: "HEO", name: "Sun Blocker 19"},
      { payload_user_id: 3, weight: 2300, orbital_requirement: "HEO", name: "Sun Blocker 4"},
      { payload_user_id: 1, weight: 2150, orbital_requirement: "HEO", name: "Sun Blocker 45"},
      { payload_user_id: 3, weight: 3200, orbital_requirement: "HEO", name: "Sun Blocker 12"},
      { payload_user_id: 3, weight: 1400, orbital_requirement: "HEO", name: "Comm Sat 63"},
      { payload_user_id: 2, weight: 900, orbital_requirement: "HEO", name: "Comm Sat 53"},
      { payload_user_id: 2, weight: 920, orbital_requirement: "MEO", name: "RfG 40"},
      { payload_user_id: 2, weight: 870, orbital_requirement: "MEO", name: "Comm Sat 23"},
      { payload_user_id: 2, weight: 865, orbital_requirement: "MEO", name: "Comm Sat 78"},
      { payload_user_id: 1, weight: 1200, orbital_requirement: "MEO", name: "Comm Sat 84"},
      { payload_user_id: 1, weight: 1500, orbital_requirement: "MEO", name: "Comm Sat 16"},
      { payload_user_id: 3, weight: 1750, orbital_requirement: "MEO", name: "Spy Sat 22"},
      { payload_user_id: 1, weight: 950, orbital_requirement: "MEO", name: "Spy Sat 77"},
      { payload_user_id: 1, weight: 970, orbital_requirement: "MEO", name: "Spy Sat 1"},
      { payload_user_id: 2, weight: 2030, orbital_requirement: "GEO", name: "GPS Sat 34"},
      { payload_user_id: 3, weight: 2030, orbital_requirement: "GEO", name: "GPS Sat 44"},
      { payload_user_id: 3, weight: 2050, orbital_requirement: "GEO", name: "GPS Sat 54"},
      { payload_user_id: 2, weight: 2000, orbital_requirement: "GEO", name: "GPS Sat 43"},
      { payload_user_id: 1, weight: 2300, orbital_requirement: "GEO", name: "GPS Sat 91"},
      { payload_user_id: 2, weight: 2300, orbital_requirement: "GEO", name: "GPS Sat 80"},
      { payload_user_id: 3, weight: 3700, orbital_requirement: "GEO", name: "GWS"},
      { payload_user_id: 3, weight: 2500, orbital_requirement: "GEO", name: "Sun Monitor 12"},
      { payload_user_id: 2, weight: 2340, orbital_requirement: "GEO", name: "Sun Monitor 32"},
      { payload_user_id: 1, weight: 2200, orbital_requirement: "GEO", name: "Sun Monitor 42"},
      { payload_user_id: 2, weight: 4300, orbital_requirement: "GEO", name: "Sun Monitor 52"},
      { payload_user_id: 3, weight: 3070, orbital_requirement: "LEO", name: "RfG 20"},
      { payload_user_id: 1, weight: 2004, orbital_requirement: "LEO", name: "RfG 22"}
    ]
  );
};
