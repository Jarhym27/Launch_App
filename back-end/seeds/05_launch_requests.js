/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('launch_requests').del()
  await knex('launch_requests').insert([
    { payload_id: 1, launch_pad_id: 1, launch_vehicle_id: 1, request_status: 'Launched', launch_date: '2023-4-11', request_cost: 93 },
    { payload_id: 5, launch_pad_id: 1, launch_vehicle_id: 2, request_status: "Denied", launch_date: "2031-09-03", request_cost: 126 },
    { payload_id: 20, launch_pad_id: 2, launch_vehicle_id: 12, request_status: "Denied", launch_date: "2023-10-15", request_cost: 148 },
    { payload_id: 27, launch_pad_id: 4, launch_vehicle_id: 7, request_status: "Pending", launch_date: "2033-09-27", request_cost: 210 },
    { payload_id: 34, launch_pad_id: 8, launch_vehicle_id: 1, request_status: "Pending", launch_date: "2024-10-06", request_cost: 83 },
    { payload_id: 30, launch_pad_id: 8, launch_vehicle_id: 15, request_status: "Pending", launch_date: "2029-07-03", request_cost: 248 },
    { payload_id: 19, launch_pad_id: 9, launch_vehicle_id: 5, request_status: "Pending", launch_date: "2027-10-23", request_cost: 286 },
    { payload_id: 30, launch_pad_id: 9, launch_vehicle_id: 20, request_status: "Scheduled", launch_date: "2026-07-28", request_cost: 15 },
    { payload_id: 16, launch_pad_id: 15, launch_vehicle_id: 18, request_status: "Scheduled", launch_date: "2033-01-23", request_cost: 8 },
    { payload_id: 3, launch_pad_id: 1, launch_vehicle_id: 5, request_status: "Scheduled", launch_date: "2030-01-23", request_cost: 8 },
    { payload_id: 5, launch_pad_id: 1, launch_vehicle_id: 1, request_status: "Scheduled", launch_date: "2023-04-21", request_cost: 126 },
    { payload_id: 35, launch_pad_id: 2, launch_vehicle_id: 12, request_status: "Scheduled", launch_date: "2023-04-28", request_cost: 148 },
  ]
  );
};
