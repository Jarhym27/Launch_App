/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([
    { sender_id: 2, recipient_id: 8, launch_request_id: 1, message: 'Hey, thanks for such a great launch!', notification_type:'New message', notification_ack: 'false', timestamp: '2023-04-17 16:52:12'},
    { sender_id: 8, recipient_id: 2, launch_request_id: 1, message: 'No problem!', notification_type:'New message', notification_ack: 'false', timestamp: '2023-04-17 17:52:12'},
    { sender_id: 8, recipient_id: 2, launch_request_id: 3, message: "Sorry we had to deny your request - our rocket is experiencing issues and will be decommissioned.",notification_type: 'Request denied',notification_ack: 'false', timestamp: '2023-04-17 18:52:14'},
    {
      sender_id: 2,
      recipient_id: 8,
      launch_request_id: 3,
      message: "Do you have any availability on other Falcon 9 Rockets at the Cape in the next 6 months?",
      notification_type: "New message",
      notification_ack: 'false',
      timestamp: "2023-04-18T03:25:44.621Z",
    },
    {
      sender_id: 2,
      recipient_id: 8,
      launch_request_id: 1,
      message: "Can you support?",
      notification_type: "New request",
      notification_ack: 'false',
      timestamp: '2023-04-15 16:52:12',
    },
  ]
  );
};
