const faker = require("faker");
("use strict");

/** @type {import('sequelize-cli').Migration} */

let polls = [];
for (let index = 0; index < 5; index++) {
  polls.push({
    pollDate: faker.date.between("1996-01-25", new Date()).toLocaleDateString(),
    pollTime: faker.date.between("1996-01-25", new Date()).toLocaleTimeString(),
    pollLocation: faker.random.number(4),
    owner_id: faker.commerce.price(34, 43, 0),
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Polls", polls);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Polls", null, {});
  },
};
