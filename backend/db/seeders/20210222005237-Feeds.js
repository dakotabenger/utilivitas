'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const feeds = []
    for (let i = 0; i < 14; i++ ) {
      const feed = {
        name: "personal feed",
        userId: i
      }
      feeds.push(feed)
    }
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Feeds', [...feeds], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
