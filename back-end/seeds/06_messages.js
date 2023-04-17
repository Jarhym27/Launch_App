/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([
    { sender_id: 2, recipient_id: 8, launch_request_id: 1, message: 'Hey, thanks for such a great launch!',timestamp: '2023-04-17 16:52:12'},
    { sender_id: 8, recipient_id: 2, launch_request_id: 1, message: 'No problem!',timestamp: '2023-04-17 17:52:12'},
    { sender_id: 8, recipient_id: 11, launch_request_id: 2, message: 'Sorry, we had to deny your request for now because our rocket is experiencing issues!',timestamp: '2023-04-17 18:52:12'}
  ]
  );
};
