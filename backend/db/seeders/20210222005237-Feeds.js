'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const feeds = []
    for (let i = 0; i < 9; i++ ) {
      console.log(i)
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
   return queryInterface.bulkInsert('Feeds', [
    {
      name: "personal feed",
      userId: 1
    },
    {
      name: "personal feed",
      userId: 2
    },
    {
      name: "personal feed",
      userId: 3
    },
    {
      name: "personal feed",
      userId: 4
    },
    {
      name: "personal feed",
      userId: 5
    },
    {
      name: "personal feed",
      userId: 6
    },
    {
      name: "personal feed",
      userId: 7
    },
    {
      name: "personal feed",
      userId: 8
    },
    {
      name: "personal feed",
      userId: 9
    },
    {
      name: "personal feed",
      userId: 10
    },
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Feeds', null, {});
  }
};
