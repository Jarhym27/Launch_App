/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('launch_requests').del()
  await knex('launch_requests').insert([
    {
      payload_id: 1, //1-39
      launch_pad_id: 1, //1-49
      launch_vehicle_id: 1, //1-24
      request_status: 'Launched', //'Denied','Pending','Scheduled','Launched'
      launch_date: '2023-4-11', //2023-10-10 through 2033-10-10
      request_cost: 18 //40 through 300
    },

    { payload_id: 10, launch_pad_id: 4, launch_vehicle_id: 14, request_status: "Denied", launch_date: "2028-05-02", request_cost: 247 },
    { payload_id: 28, launch_pad_id: 24, launch_vehicle_id: 9, request_status: "Denied", launch_date: "2024-04-12", request_cost: 55 },
    { payload_id: 22, launch_pad_id: 3, launch_vehicle_id: 17, request_status: "Denied", launch_date: "2029-04-13", request_cost: 108 },
    { payload_id: 17, launch_pad_id: 13, launch_vehicle_id: 23, request_status: "Denied", launch_date: "2033-09-01", request_cost: 72 },
    { payload_id: 1, launch_pad_id: 29, launch_vehicle_id: 1, request_status: "Denied", launch_date: "2029-06-15", request_cost: 271 },
    { payload_id: 5, launch_pad_id: 11, launch_vehicle_id: 19, request_status: "Denied", launch_date: "2032-11-30", request_cost: 202 },
    { payload_id: 7, launch_pad_id: 41, launch_vehicle_id: 5, request_status: "Denied", launch_date: "2023-12-02", request_cost: 297 },
    { payload_id: 36, launch_pad_id: 47, launch_vehicle_id: 24, request_status: "Denied", launch_date: "2029-02-05", request_cost: 195 },
    { payload_id: 11, launch_pad_id: 32, launch_vehicle_id: 1, request_status: "Denied", launch_date: "2026-08-24", request_cost: 172 },
    { payload_id: 16, launch_pad_id: 11, launch_vehicle_id: 7, request_status: "Denied", launch_date: "2028-10-07", request_cost: 254 },
    { payload_id: 38, launch_pad_id: 39, launch_vehicle_id: 17, request_status: "Denied", launch_date: "2033-07-03", request_cost: 51 },
    { payload_id: 2, launch_pad_id: 14, launch_vehicle_id: 23, request_status: "Denied", launch_date: "2029-09-07", request_cost: 219 },
    { payload_id: 25, launch_pad_id: 39, launch_vehicle_id: 22, request_status: "Denied", launch_date: "2027-04-09", request_cost: 242 },
    { payload_id: 15, launch_pad_id: 34, launch_vehicle_id: 6, request_status: "Denied", launch_date: "2028-03-19", request_cost: 118 },
    { payload_id: 28, launch_pad_id: 44, launch_vehicle_id: 23, request_status: "Denied", launch_date: "2030-07-08", request_cost: 152 },
    { payload_id: 23, launch_pad_id: 6, launch_vehicle_id: 13, request_status: "Denied", launch_date: "2029-10-26", request_cost: 142 },
    { payload_id: 26, launch_pad_id: 3, launch_vehicle_id: 19, request_status: "Denied", launch_date: "2030-08-25", request_cost: 136 },
    { payload_id: 13, launch_pad_id: 8, launch_vehicle_id: 12, request_status: "Denied", launch_date: "2029-07-08", request_cost: 179 },
    { payload_id: 38, launch_pad_id: 39, launch_vehicle_id: 5, request_status: "Denied", launch_date: "2031-04-10", request_cost: 120 },
    { payload_id: 16, launch_pad_id: 39, launch_vehicle_id: 12, request_status: "Denied", launch_date: "2030-12-03", request_cost: 232 },
    { payload_id: 1, launch_pad_id: 42, launch_vehicle_id: 4, request_status: "Denied", launch_date: "2026-06-15", request_cost: 198 },
    { payload_id: 6, launch_pad_id: 32, launch_vehicle_id: 13, request_status: "Denied", launch_date: "2027-06-12", request_cost: 274 },
    { payload_id: 5, launch_pad_id: 38, launch_vehicle_id: 1, request_status: "Denied", launch_date: "2031-09-03", request_cost: 126 },
    { payload_id: 35, launch_pad_id: 35, launch_vehicle_id: 22, request_status: "Denied", launch_date: "2023-10-15", request_cost: 148 },
    { payload_id: 13, launch_pad_id: 16, launch_vehicle_id: 8, request_status: "Denied", launch_date: "2024-10-18", request_cost: 81 },
    { payload_id: 27, launch_pad_id: 2, launch_vehicle_id: 7, request_status: "Pending", launch_date: "2033-09-27", request_cost: 210 },
    { payload_id: 34, launch_pad_id: 38, launch_vehicle_id: 1, request_status: "Pending", launch_date: "2024-10-06", request_cost: 83 },
    { payload_id: 30, launch_pad_id: 36, launch_vehicle_id: 15, request_status: "Pending", launch_date: "2029-07-03", request_cost: 248 },
    { payload_id: 19, launch_pad_id: 24, launch_vehicle_id: 5, request_status: "Pending", launch_date: "2027-10-23", request_cost: 286 },
    { payload_id: 36, launch_pad_id: 47, launch_vehicle_id: 20, request_status: "Pending", launch_date: "2027-09-14", request_cost: 75 },
    { payload_id: 2, launch_pad_id: 47, launch_vehicle_id: 9, request_status: "Pending", launch_date: "2030-01-03", request_cost: 109 },
    { payload_id: 5, launch_pad_id: 13, launch_vehicle_id: 12, request_status: "Pending", launch_date: "2030-07-29", request_cost: 125 },
    { payload_id: 17, launch_pad_id: 48, launch_vehicle_id: 13, request_status: "Pending", launch_date: "2028-07-28", request_cost: 74 },
    { payload_id: 13, launch_pad_id: 27, launch_vehicle_id: 11, request_status: "Pending", launch_date: "2033-01-16", request_cost: 86 },
    { payload_id: 2, launch_pad_id: 39, launch_vehicle_id: 10, request_status: "Pending", launch_date: "2028-11-23", request_cost: 190 },
    { payload_id: 11, launch_pad_id: 2, launch_vehicle_id: 17, request_status: "Pending", launch_date: "2032-04-23", request_cost: 239 },
    { payload_id: 21, launch_pad_id: 33, launch_vehicle_id: 3, request_status: "Pending", launch_date: "2026-01-19", request_cost: 218 },
    { payload_id: 38, launch_pad_id: 27, launch_vehicle_id: 18, request_status: "Pending", launch_date: "2024-08-12", request_cost: 58 },
    { payload_id: 27, launch_pad_id: 16, launch_vehicle_id: 2, request_status: "Pending", launch_date: "2033-06-07", request_cost: 189 },
    { payload_id: 30, launch_pad_id: 21, launch_vehicle_id: 20, request_status: "Scheduled", launch_date: "2026-07-28", request_cost: 89 },
    { payload_id: 11, launch_pad_id: 49, launch_vehicle_id: 15, request_status: "Scheduled", launch_date: "2033-03-10", request_cost: 70 },
    { payload_id: 3, launch_pad_id: 36, launch_vehicle_id: 14, request_status: "Scheduled", launch_date: "2030-05-16", request_cost: 119 },
    { payload_id: 17, launch_pad_id: 9, launch_vehicle_id: 12, request_status: "Scheduled", launch_date: "2024-10-29", request_cost: 87 },
    { payload_id: 16, launch_pad_id: 21, launch_vehicle_id: 13, request_status: "Scheduled", launch_date: "2033-01-23", request_cost: 105 },
    { payload_id: 24, launch_pad_id: 28, launch_vehicle_id: 18, request_status: "Scheduled", launch_date: "2027-01-16", request_cost: 265 },
    { payload_id: 8, launch_pad_id: 33, launch_vehicle_id: 8, request_status: "Scheduled", launch_date: "2027-05-31", request_cost: 188 },
    { payload_id: 6, launch_pad_id: 44, launch_vehicle_id: 15, request_status: "Scheduled", launch_date: "2030-05-11", request_cost: 280 },
    { payload_id: 20, launch_pad_id: 5, launch_vehicle_id: 5, request_status: "Scheduled", launch_date: "2032-08-12", request_cost: 171 },
    { payload_id: 29, launch_pad_id: 10, launch_vehicle_id: 17, request_status: "Denied", launch_date: "2032-08-28", request_cost: 291 },
    { payload_id: 4, launch_pad_id: 43, launch_vehicle_id: 3, request_status: "Scheduled", launch_date: "2032-08-12", request_cost: 110 }
  ]
  );
};
