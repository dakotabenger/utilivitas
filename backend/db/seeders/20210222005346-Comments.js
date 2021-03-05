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
   return queryInterface.bulkInsert('Comments', [
     {
    commentText:"LOVED IT. Ashoka was awesome they got her perfect!",
    userId:2,
    postId:1
  },
  {
    commentText:"I've been waiting to watch it with my wife when we have time!",
    userId:4,
    postId:1
  },
  {
    commentText:"Good, nearly done!",
    userId:1,
    postId:3
  },
  {
    commentText:"Yeah talk about crazy did you see what Robin Hood did?",
    userId:1,
    postId:4
  },
  {
    commentText:"What is it of?",
    userId:3,
    postId:5
  },
  {
    commentText:"The suicide prevention hotline number.",
    userId:2,
    postId:5
  },
  {
    commentText:"You never answer the phone dude!",
    userId:2,
    postId:6
  },
  {
    commentText:"Ok hold on...",
    userId:2,
    postId:7
  },
  {
    commentText:"Ford Ranger",
    userId:2,
    postId:8
  },
  {
    commentText:"Me too!!",
    userId:4,
    postId:8
  },
  {
    commentText:"Me as well!",
    userId:5,
    postId:8
  }
], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
