/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('personal_info',table => {
        table.increments('id')
        table.foreign('user_id').references('users')
        table.string('last_name')
        table.string('first_name')
        table.string('phone_number')
        table.string('email')
        table.string('address')
        table.string('city')
        table.string('state_or_province')
        table.string('postal_code')
        table.string('country')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('personal_info');
};
