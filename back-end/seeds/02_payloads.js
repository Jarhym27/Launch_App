/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('payloads').del()
  await knex('payloads').insert(
    [
      { payload_user_id: 2, weight: 3209, orbital_requirement: "LEO", name: "Lunar Lander 12", description: "This satellite is designed to land on the moon and perform scientific experiments on the lunar surface. It is equipped with advanced instruments for gathering data about the moon's geology, atmosphere, and magnetic field."},
      { payload_user_id: 2, weight: 3450, orbital_requirement: "MEO", name: "Spy Satellite 3", description: "This satellite is a surveillance platform used for monitoring military and civilian targets from space. It is equipped with high-resolution cameras, radar, and other sensors to collect intelligence information."},
      { payload_user_id: 3, weight: 1200, orbital_requirement: "LEO", name: "Starlink 445", description: "This satellite is part of a global satellite internet constellation designed to provide high-speed internet access to remote and underserved areas of the world. It uses advanced communication technology to deliver fast and reliable internet connectivity."},
      { payload_user_id: 1, weight: 230, orbital_requirement: "LEO", name: "Small-Sat 3", description: "This satellite is a small, low-cost spacecraft used for scientific research and experimentation in space. It is equipped with sensors and instruments to study the Earth's atmosphere, climate, and magnetic field."},
      { payload_user_id: 11, weight: 400, orbital_requirement: "MEO", name: "Small-Sat 1", description: "This satellite is a small, low-cost spacecraft used for commercial purposes, such as remote sensing, earth observation, and telecommunications. It is designed to operate in medium Earth orbit (MEO), which is ideal for certain types of applications."},
      { payload_user_id: 11, weight: 350, orbital_requirement: "LEO", name: "Small-Sat 4", description: "This satellite is a small, low-cost spacecraft used for scientific research and experimentation in space. It is equipped with sensors and instruments to study the Earth's atmosphere, climate, and magnetic field."},
      { payload_user_id: 2, weight: 365, orbital_requirement: "LEO", name: "Small-Sat 5", description: "This satellite is a small, low-cost spacecraft used for commercial purposes, such as remote sensing, earth observation, and telecommunications. It is designed to operate in low Earth orbit (LEO), which is ideal for certain types of applications."},
      { payload_user_id: 11, weight: 450, orbital_requirement: "MEO", name: "Small-Sat 6", description: "This satellite is a small, low-cost spacecraft used for commercial purposes, such as remote sensing, earth observation, and telecommunications. It is designed to operate in medium Earth orbit (MEO), which is ideal for certain types of applications."},
      { payload_user_id: 3, weight: 200, orbital_requirement: "LEO", name: "MicroSat 12", description: "This satellite is a small, low-cost spacecraft used for scientific research and experimentation in space. It is equipped with sensors and instruments to study the Earth's atmosphere, climate, and magnetic field."},
      { payload_user_id: 2, weight: 1200, orbital_requirement: "MEO", name: "GPS Sat 74", description: "This satellite is part of a global positioning system (GPS) used for navigation and timing purposes. It is designed to operate in medium earth orbit (MEO)"},
      { payload_user_id: 1, weight: 1400, orbital_requirement: "LEO", name: "Starlink 435", description: "A communication satellite built by SpaceX's Starlink program to provide high-speed internet access from orbit." },
      { payload_user_id: 1, weight: 1400, orbital_requirement: "LEO", name: "Starlink 245", description: "A communication satellite built by SpaceX's Starlink program to provide high-speed internet access from orbit." },
      { payload_user_id: 3, weight: 1300, orbital_requirement: "LEO", name: "Starlink 322", description: "A communication satellite built by SpaceX's Starlink program to provide high-speed internet access from orbit." },
      { payload_user_id: 11, weight: 2570, orbital_requirement: "LEO", name: "Comm Sat 4", description: "A communication satellite designed for commercial use, providing voice and data services to users on the ground." },
      { payload_user_id: 2, weight: 4250, orbital_requirement: "LEO", name: "Comm Sat 6", description: "A communication satellite designed for commercial use, providing voice and data services to users on the ground." },
      { payload_user_id: 1, weight: 3560, orbital_requirement: "LEO", name: "Comm Sat 12", description: "A communication satellite designed for commercial use, providing voice and data services to users on the ground." },
      { payload_user_id: 1, weight: 1450, orbital_requirement: "LEO", name: "Starlink 1382", description: "A communication satellite built by SpaceX's Starlink program to provide high-speed internet access from orbit." },
      { payload_user_id: 11, weight: 3250, orbital_requirement: "HEO", name: "Spy Sat 38", description: "A reconnaissance satellite designed for intelligence gathering purposes." },
      { payload_user_id: 11, weight: 3679, orbital_requirement: "HEO", name: "RfG 60", description: "A scientific research satellite studying the Earth's magnetic field and its interactions with the sun." },
      {
        payload_user_id: 2,
        weight: 4000,
        orbital_requirement: "HEO",
        name: "Sun Blocker 19",
        description: "A large satellite designed to block the sun's rays and reduce the amount of heat absorbed by other spacecraft in the same orbit."
        },
        {
        payload_user_id: 3,
        weight: 2300,
        orbital_requirement: "HEO",
        name: "Sun Blocker 4",
        description: "A small satellite designed to reduce the amount of heat absorbed by other spacecraft in the same orbit."
        },
        {
        payload_user_id: 1,
        weight: 2150,
        orbital_requirement: "HEO",
        name: "Sun Blocker 45",
        description: "A medium-sized satellite designed to reduce the amount of heat absorbed by other spacecraft in the same orbit."
        },
        {
        payload_user_id: 3,
        weight: 3200,
        orbital_requirement: "HEO",
        name: "Sun Blocker 12",
        description: "A large satellite designed to block the sun's rays and reduce the amount of heat absorbed by other spacecraft in the same orbit."
        },
        {
        payload_user_id: 3,
        weight: 1400,
        orbital_requirement: "HEO",
        name: "Comm Sat 63",
        description: "A small communication satellite designed for use in a high Earth orbit (HEO)."
        },
        {
        payload_user_id: 2,
        weight: 900,
        orbital_requirement: "HEO",
        name: "Comm Sat 53",
        description: "A small communication satellite designed for use in a high Earth orbit (HEO)."
        },
        {
        payload_user_id: 2,
        weight: 920,
        orbital_requirement: "MEO",
        name: "RfG 40",
        description: "A medium Earth orbit (MEO) satellite used for radio frequency geolocation."
        },
        {
        payload_user_id: 2,
        weight: 870,
        orbital_requirement: "MEO",
        name: "Comm Sat 23",
        description: "A small communication satellite designed for use in a medium Earth orbit (MEO)."
        },
        {
        payload_user_id: 2,
        weight: 865,
        orbital_requirement: "MEO",
        name: "Comm Sat 78",
        description: "A small communication satellite designed for use in a medium Earth orbit (MEO)."
        },
        {
        payload_user_id: 1,
        weight: 1200,
        orbital_requirement: "MEO",
        name: "Comm Sat 84",
        description: "A medium-sized communication satellite designed for use in a medium Earth orbit (MEO)."
        },
        {
        payload_user_id: 1,
        weight: 1500,
        orbital_requirement: "MEO",
        name: "Comm Sat 16",
        description: "A medium-sized communication satellite designed for use in a medium Earth orbit (MEO)."
        },
        {
        payload_user_id: 3,
        weight: 1750,
        orbital_requirement: "MEO",
        name: "Spy Sat 22",
        description: "A medium-sized satellite designed for spying and reconnaissance in a medium Earth orbit (MEO)."
        },
        {
          payload_user_id: 1, 
          weight: 950, 
          orbital_requirement: "MEO", 
          name: "Spy Sat 77",
          description: "A satellite designed for spying purposes and orbiting in medium Earth orbit (MEO)."
        },
        {
          payload_user_id: 1, 
          weight: 970, 
          orbital_requirement: "MEO", 
          name: "Spy Sat 1",
          description: "A spy satellite that is placed in medium Earth orbit (MEO) to provide surveillance and reconnaissance."
        },
        {
          payload_user_id: 2, 
          weight: 2030, 
          orbital_requirement: "MEO", 
          name: "GPS Sat 34",
          description: "A GPS satellite that is placed in medium Earth orbit (MEO) to provide location and timing information."
        },
        {
          payload_user_id: 3, 
          weight: 2030, 
          orbital_requirement: "MEO", 
          name: "GPS Sat 44",
          description: "A satellite that provides GPS services and is placed in medium Earth orbit (MEO)."
        },
        {
          payload_user_id: 3, 
          weight: 2050, 
          orbital_requirement: "MEO", 
          name: "GPS Sat 54",
          description: "A GPS satellite that is placed in medium Earth orbit (MEO) and provides high-precision location and timing information."
        },
        {
          payload_user_id: 2, 
          weight: 2000, 
          orbital_requirement: "MEO", 
          name: "GPS Sat 43",
          description: "A GPS satellite that is placed in medium Earth orbit (MEO) and provides location and timing information."
        },
        {
          payload_user_id: 1, 
          weight: 2300, 
          orbital_requirement: "MEO", 
          name: "GPS Sat 91",
          description: "A GPS satellite that is placed in medium Earth orbit (MEO) and provides precise location and timing information."
        },
        {
          payload_user_id: 2, 
          weight: 2300, 
          orbital_requirement: "MEO", 
          name: "GPS Sat 80",
          description: "A GPS satellite that is placed in medium Earth orbit (MEO) and provides location and timing information."
        },
        {
          payload_user_id: 3, 
          weight: 3700, 
          orbital_requirement: "GEO", 
          name: "GWS",
          description: "A communication satellite that is placed in geostationary Earth orbit (GEO) and provides global coverage."
        },
        { payload_user_id: 3, weight: 2500, orbital_requirement: "GEO", name: "Sun Monitor 12", description: "High-tech satellite designed to monitor the sun's activity from a geostationary orbit." },
        { payload_user_id: 2, weight: 2340, orbital_requirement: "GEO", name: "Sun Monitor 32", description: "Sophisticated satellite equipped with advanced sensors to study the sun's behavior from a geostationary orbit." },
        { payload_user_id: 1, weight: 2200, orbital_requirement: "GEO", name: "Sun Monitor 42", description: "Cutting-edge satellite with powerful instruments to observe the sun's activity from a geostationary orbit." },
        { payload_user_id: 2, weight: 4300, orbital_requirement: "GEO", name: "Sun Monitor 52", description: "State-of-the-art satellite designed to capture detailed images of the sun's surface and corona from a geostationary orbit." },
        { payload_user_id: 3, weight: 3070, orbital_requirement: "LEO", name: "RfG 20", description: "Advanced satellite equipped with a radio frequency generator to conduct experiments in a low Earth orbit." },
        { payload_user_id: 1, weight: 2004, orbital_requirement: "LEO", name: "RfG 22", description: "Innovative satellite with a sophisticated radio frequency generator for conducting experiments in a low Earth orbit." }
    ]
  );
};
