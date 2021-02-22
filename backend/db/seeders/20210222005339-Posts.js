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
   return queryInterface.bulkInsert('Posts', [
     {
    postText:"Who's been watching this season of the mandalorian? The Bo-Katan and Ashoka appererances are pretty cool, especially as a fan of the animated shows. What did you guys think of it?",
    userId:1,
    feedId:1
  },
  {
    postText:"Tom Brady won another!",
    userId:1,
    feedId:1
  },
  {
    postText:"Hey how's your project going?",
    userId:2,
    feedId:1
  },
  {
    postText:"Have you been paying attention to this GME thing?",
    userId:3,
    feedId:1
  },
  {
    postText:"Got a new bumper sticker!",
    userId:2,
    feedId:2
  },
  {
    postText:"Hit me up more brooooo!",
    userId:1,
    feedId:2
  },
  {
    postText:"Send me pics of the baby!!",
    userId:3,
    feedId:2
  },
  {
    postText:"What truck you got!?",
    userId:4,
    feedId:2
  },
  {
    postText:"I just got a automatic formula maker that fills the baby bottles for me! So cool!",
    userId:2,
    feedId:2
  },
], {})
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
