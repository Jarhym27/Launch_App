// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('username');
        table.string('password');
        table.integer("role_id")
        table.foreign('role_id').references("id").inTable("roles");
       
    })
};

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.down = function(knex) {
    return knex.schema
    .alterTable("users", table =>{
        table.dropForeign("role_id");
        table.dropColumn("role_id");
    })
    .then(() => {
        return knex.schema.dropTableIfExists('users');
    })
  };
    
