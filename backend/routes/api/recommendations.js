const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Interest,Value,Feed } = require('../../db/models');

const router = express.Router();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

router.get("/",requireAuth,asyncHandler(async (req,res) => {
    const {userId} = req
    const userInterests = await Interest.findAll({where:{userId:userId}})
    const userValues = await Value.findAll({order: Sequelize.literal('rand()'), limit: 5,where:{userId:userId}})
    const matchingInterests = await Interest.findAll({order: Sequelize.literal('rand()'), limit: 5,where:{tag: userInterests}})
    const matchingValues = await Value.findAll({where:{tag:userValues}})
    if (!matchingInterests && !matchingValues) {
        const findUsers = await User.findAll({order: Sequelize.literal('rand()'), limit: 5})
        const randomizeUsers = shuffleArray(findUsers)
        const matchingUser = randomizeUsers[0]
        return res.json({matchingUser})}
    const bothValuesandInterests = [...matchingInterests,...matchingValues]
    const matchingUsers = await Promise.all(bothValuesandInterests.map(async (matchCritera) => {
        return await User.findByPk(matchCritera.userId)
    }))
    const randomizedUsers = shuffleArray(matchingUsers)
    const matchingUser = randomizedUsers[0]
    return res.json({
        matchingUser
      });
}))

module.exports = router;
