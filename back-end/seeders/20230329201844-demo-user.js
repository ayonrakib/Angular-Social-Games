import faker from 'faker';
// const faker = require("faker");
'use strict';


/** @type {import('sequelize-cli').Migration} */

let users = [];
for(let index = 0; index < 10; index++){
  users.push({
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    salt: faker.random.alphaNumeric(10),
    session: ""
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};