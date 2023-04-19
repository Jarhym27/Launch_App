/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('launch_requests').del()
  await knex('launch_requests').insert([
    { payload_id: 1, launch_pad_id: 1, launch_vehicle_id: 1, request_status: 'Launched', launch_date: '2023-4-11', request_cost: 93 },
    { payload_id: 5, launch_pad_id: 1, launch_vehicle_id: 2, request_status: "Denied", launch_date: "2023-09-03", request_cost: 126 },
    { payload_id: 20, launch_pad_id: 2, launch_vehicle_id: 12, request_status: "Denied", launch_date: "2023-05-15", request_cost: 148 },
    { payload_id: 27, launch_pad_id: 3, launch_vehicle_id: 7, request_status: "Pending", launch_date: "2023-06-27", request_cost: 210 },
    { payload_id: 34, launch_pad_id: 7, launch_vehicle_id: 1, request_status: "Pending", launch_date: "2023-10-06", request_cost: 83 },
    { payload_id: 30, launch_pad_id: 7, launch_vehicle_id: 15, request_status: "Pending", launch_date: "2023-06-01", request_cost: 248 },
    { payload_id: 19, launch_pad_id: 8, launch_vehicle_id: 5, request_status: "Pending", launch_date: "2024-02-23", request_cost: 286 },
    { payload_id: 4, launch_pad_id: 8, launch_vehicle_id: 20, request_status: "Scheduled", launch_date: "2024-01-28", request_cost: 15 },
    { payload_id: 16, launch_pad_id: 14, launch_vehicle_id: 18, request_status: "Scheduled", launch_date: "2023-07-23", request_cost: 8 },
    { payload_id: 3, launch_pad_id: 1, launch_vehicle_id: 5, request_status: "Scheduled", launch_date: "2023-06-23", request_cost: 8 },
    { payload_id: 6, launch_pad_id: 1, launch_vehicle_id: 1, request_status: "Scheduled", launch_date: "2023-04-21", request_cost: 126 },
    { payload_id: 35, launch_pad_id: 2, launch_vehicle_id: 12, request_status: "Scheduled", launch_date: "2023-04-28", request_cost: 148 },
    { payload_id: 13, launch_pad_id: 4, launch_vehicle_id: 9, request_status: 'Launched', launch_date: '2021-04-11', request_cost: 93 },
    { payload_id: 47, launch_pad_id: 1, launch_vehicle_id: 37, request_status: 'Launched', launch_date: '2021-06-11', request_cost: 69 },
    { payload_id: 48, launch_pad_id: 12, launch_vehicle_id: 38, request_status: 'Launched', launch_date: '2021-08-11', request_cost: 90 },
    { payload_id: 49, launch_pad_id: 13, launch_vehicle_id: 39, request_status: 'Launched', launch_date: '2020-06-11', request_cost: 109 },
    { payload_id: 50, launch_pad_id: 13, launch_vehicle_id: 40, request_status: 'Launched', launch_date: '2020-03-11', request_cost: 107 },
    { payload_id: 51, launch_pad_id: 8, launch_vehicle_id: 41, request_status: 'Launched', launch_date: '2021-03-11', request_cost: 16 },
    { payload_id: 52, launch_pad_id: 8, launch_vehicle_id: 42, request_status: 'Launched', launch_date: '2022-03-11', request_cost: 16 },
    { payload_id: 53, launch_pad_id: 14, launch_vehicle_id: 43, request_status: 'Launched', launch_date: '2021-08-19', request_cost: 8 },
    { payload_id: 54, launch_pad_id: 14, launch_vehicle_id: 44, request_status: 'Launched', launch_date: '2020-08-11', request_cost: 8 },
    { payload_id: 55, launch_pad_id: 1, launch_vehicle_id: 45, request_status: 'Launched', launch_date: '2019-07-11', request_cost: 102 },
    { payload_id: 56, launch_pad_id: 1, launch_vehicle_id: 46, request_status: 'Launched', launch_date: '2021-08-13', request_cost: 102 },
    { payload_id: 57, launch_pad_id: 1, launch_vehicle_id: 47, request_status: 'Launched', launch_date: '2023-04-03', request_cost: 102 },
    { payload_id: 58, launch_pad_id: 1, launch_vehicle_id: 48, request_status: 'Launched', launch_date: '2022-04-03', request_cost: 102 },
    { payload_id: 59, launch_pad_id: 1, launch_vehicle_id: 49, request_status: 'Scheduled', launch_date: '2023-05-12', request_cost: 102 },
    { payload_id: 60, launch_pad_id: 13, launch_vehicle_id: 50, request_status: 'Scheduled', launch_date: '2023-05-12', request_cost: 107 },
    { payload_id: 61, launch_pad_id: 7, launch_vehicle_id: 51, request_status: 'Scheduled', launch_date: '2023-06-12', request_cost: 3 },
    { payload_id: 62, launch_pad_id: 12, launch_vehicle_id: 52, request_status: 'Scheduled', launch_date: '2023-07-12', request_cost: 90 },
  ]
  );
};
