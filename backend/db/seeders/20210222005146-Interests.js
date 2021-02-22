'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const randomInterests = []
    for (let i = 10; i < 14; i++) {
  const sportsTag =      {
        tag: 'sports',
        description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
        userId: i
      }
      const musicTag = {
        tag: 'music',
        description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
        userId: i
      }
      const techTag = {
        tag: 'technology',
        description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
        userId: i
      }
      const diyTag = {
        tag: 'DIY',
        description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
        userId: i
      },
      const tvTag =
      {
        tag: 'tv/movies',
        description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
        userId: i
      }
      randomInterests.push(tvTag)
      randomInterests.push(sportsTag)
      randomInterests.push(diyTag)
      randomInterests.push(techTag)
      randomInterests.push(musicTag)
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
   return queryInterface.bulkInsert('Interests', [
     {
    tag: 'sports',
    description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
    userId: 1
  },
  {
    tag: 'music',
    description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
    userId: 1
  },
  {
    tag: 'technology',
    description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
    userId: 1
  },
  {
    tag: 'DIY',
    description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
    userId: 1
  },
  {
    tag: 'tv/movies',
    description: "I'm a huge fan of Boston sports, hip hop and RnB, software development and technology, and Star Wars movies!",
    userId: 1
  },
  {
    tag: 'gaming',
    description: "I love trucks & working on trucks. Also love playing video games & listening to music.",
    userId: 2
  },
  {
    tag: 'music',
    description: "I love trucks & working on trucks. Also love playing video games & listening to music.",
    userId: 2
  },
  {
    tag: 'trucks',
    description: "I love trucks & working on trucks. Also love playing video games & listening to music.",
    userId: 2
  },
  {
    tag: 'mechanics',
    description: "I love trucks & working on trucks. Also love playing video games & listening to music.",
    userId: 2
  },
  {
    tag: 'DIY',
    description: "I love trucks & working on trucks. Also love playing video games & listening to music.",
    userId: 2
  }, {
    tag: 'law',
    description: "I like true crime tv shows!",
    userId: 3
  },
  {
    tag: 'true crime',
    description: "I like true crime tv shows!",
    userId: 3
  },
  {
    tag: 'quilting',
    description: "I like true crime tv shows!",
    userId: 3
  },
  {
    tag: 'making masks',
    description: "I like true crime tv shows!",
    userId: 3
  },
  {
    tag: 'tv/movies',
    description: "I like true crime tv shows!",
    userId: 3
  },
  {
    tag: 'contruction',
    description: "I love hot wheels, guns, DIY projects and Marvel movies",
    userId: 4
  },
  {
    tag: 'hot wheels',
    description: "I love hot wheels, guns, DIY projects and Marvel movies",
    userId: 4
  },
  {
    tag: 'guns',
    description: "I love hot wheels, guns, DIY projects and Marvel movies",
    userId: 4
  },
  {
    tag: 'marvel movies',
    description: "I love hot wheels, guns, DIY projects and Marvel movies",
    userId: 4
  },
  {
    tag: 'tv/movies',
    description: "I love hot wheels, guns, DIY projects and Marvel movies",
    userId: 4
  },

  ,
  {
    tag: 'contruction',
    description: "I like all types of music.",
    userId: 5
  },
  {
    tag: 'hot wheels',
    description: "I like all types of music.",
    userId: 5
  },
  {
    tag: 'guns',
    description: "I like all types of music.",
    userId: 5
  },
  {
    tag: 'marvel movies',
    description: "I like all types of music.",
    userId: 5
  },
  {
    tag: 'tv/movies',
    description: "I like all types of music.",
    userId: 5
  },
  ...randomInterests

], {});
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
