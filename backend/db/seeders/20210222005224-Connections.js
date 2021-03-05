'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Connections', [
     {
    requestingUser: 1,
    requestedUser: 2,
    accepted: true,
    warm_up_response: "My order is 3 5 4 6 2 1 8 7 9"
  },
  {
    requestingUser: 1,
    requestedUser: 3,
    accepted: true,
    warm_up_response: "My order is 3 5 4 6 2 1 8 7 9"
  },
  {
    requestingUser: 1,
    requestedUser: 4,
    accepted: true,
    warm_up_response: "My order is 3 5 4 6 2 1 8 7 9"
  },
  {
    requestingUser: 5,
    requestedUser: 1,
    accepted: false,
    warm_up_response: "My order is 3 5 4 6 2 1 8 7 9"
  },
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Connections', null, {});
  }
};
