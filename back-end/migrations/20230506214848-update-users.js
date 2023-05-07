"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) => {
      queryInterface.changeColumn(
        "UUsers",
        "profilePicture",
        {
          type: Sequelize.INTEGER,
          defaultValue: undefined,
        },
        { transaction }
      );
    }),

  down: (queryInterface) => {
    return Promise.all([queryInterface.dropTable("UUsers")]);
  },
};
