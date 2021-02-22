'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const randomUsers = []
    
    for (let i = 0; i < 5; i++) {
      const randomUser = {
        email: faker.internet.email(),
            username: faker.internet.userName(),
            hashedPassword: bcrypt.hashSync('password'),
            age: faker.random.number(),
            occupation: faker.name.jobTitle(),
            warm_up_question: "Rank the Star Wars movies from most favorite to least",
            bio: faker.name.jobDescriptor(),
            photoUrl: faker.internet.avatar()
      }
      randomUsers.push(randomUser)
    }
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'demoUser',
        hashedPassword: bcrypt.hashSync('password'),
        age: 25,
        occupation: "Software Engineer",
        warm_up_question: "Rank the Star Wars movies from most favorite to least",
        bio: "I've been programming for the last year and before that I was in the legal industry. I graduated High School at 16 and haven't stopped learning since!",
        photoUrl: faker.internet.avatar()
      },
      {
        email: 'alexanderdagreat@user.io',
        username: 'alexanderdagreat',
        hashedPassword: bcrypt.hashSync('password'),
        age: 22,
        occupation: "Mechanic",
        warm_up_question: "What's your favorite truck?",
        bio: "I've worked at Firestone for four years and just started a family",
        photoUrl: faker.internet.avatar()
      },
      {
        email: 'queenLousie@user.io',
        username: 'QueenLouise',
        hashedPassword: bcrypt.hashSync('password'),
        age: 48,
        occupation: "Lawyer",
        warm_up_question: "How do we restore public trust in our insitutions?",
        bio: "I am a mother of 3 children, whom I love.",
        photoUrl: faker.internet.avatar()
      },
      {
        email: 'RonaldMcDonald@user.io',
        username: 'RonaldMcDonald',
        hashedPassword: bcrypt.hashSync('password'),
        age: 50,
        occupation: "Electrician",
        warm_up_question: "What is your favorite song from Hamilton?",
        bio: "I'm an electrican by trade. AZ by way of WV",
        photoUrl: faker.internet.avatar()
      },
      {
        email: 'KeithMaaan@user.io',
        username: 'KeithMaaan',
        hashedPassword: bcrypt.hashSync('password'),
        age: 24,
        occupation: "Construction",
        warm_up_question: "Where the party at?",
        bio: "I've worked in construction all my life and love doing it.",
        photoUrl: faker.internet.avatar()
      },
      ...randomUsers
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
