"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("UUsers", "profilePicture", {
      type: Sequelize.INTEGER,
      defaultValue: undefined,
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("UUsers");
  },
};
