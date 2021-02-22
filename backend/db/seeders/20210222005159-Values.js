'use strict';

const { response } = require("express");

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
   const randomValues = []
   for (let i = 10; i < 14; i++ ) {
    const familyTag = {
      tag: 'family',
      description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
      userId: i
    }
    const generosityTag = {
      tag: 'generosity',
      description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
      userId: i
    }
    const kindnessTag = {
      tag: 'kindess',
      description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
      userId: i
    }
    const respectTag ={
      tag: 'respect',
      description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
      userId: i
    }
    const friendsTag ={
      tag: 'friends',
      description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
      userId: i
    }
    randomValues.push(familyTag)
    randomValues.push(friendsTag)
    randomValues.push(respectTag)
    randomValues.push(generosityTag)
    randomValues.push(kindnessTag)
   }
   return queryInterface.bulkInsert('Values', [
    {
   tag: 'family',
   description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
   userId: 1
 },
 {
   tag: 'generosity',
   description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
   userId: 1
 },
 {
   tag: 'kindess',
   description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
   userId: 1
 },
 {
   tag: 'respect',
   description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
   userId: 1
 },
 {
   tag: 'friends',
   description: "Some things I value are my family and friends, being generous with others, kindness in spirit, and respect for everyone",
   userId: 1
 },
 {
  tag: 'family',
  description: "Family over everything. Respect me, I'll respect you.",
  userId: 2
},
{
  tag: 'friends',
  description: "Family over everything. Respect me, I'll respect you.",
  userId: 2
},
{
  tag: 'kindness',
  description: "Family over everything. Respect me, I'll respect you.",
  userId: 2
},
{
  tag: 'respect',
  description: "Family over everything. Respect me, I'll respect you.",
  userId: 2
},,
{
 tag: 'family',
 description: "I value my family",
 userId: 3
},
{
 tag: 'friends',
 description: "I value my family",
 userId: 3
},
{
 tag: 'kindness',
 description: "I value my family",
 userId: 3
},
{
 tag: 'respect',
 description: "I value my family",
 userId: 3
},{
  tag: 'family',
  description: "I value my wife and kids.",
  userId: 4
 },
 {
  tag: 'friends',
  description: "I value my wife and kids.",
  userId: 4
 },
 {
  tag: 'kindness',
  description: "I value my wife and kids.",
  userId: 4
 },
 {
  tag: 'respect',
  description: "I value my wife and kids.",
  userId: 4
 },
 ,{
  tag: 'family',
  description: "I value respect and generosity and I put my family and friends above everything.",
  userId: 5
 },
 {
  tag: 'friends',
  description: "I value respect and generosity and I put my family and friends above everything.",
  userId: 5
 },
 {
  tag: 'kindness',
  description: "I value respect and generosity and I put my family and friends above everything.",
  userId: 5
 },
 {
  tag: 'respect',
  description: "I value respect and generosity and I put my family and friends above everything.",
  userId: 5
 },
...randomValues

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
