// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('organization')
        table.string('username');
        table.string('password');
        table.enu('role',["lsp_user",'payload_user']);
    })
};

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.down = function(knex) {
 
        return knex.schema.dropTableIfExists('users');
    
  };
    
