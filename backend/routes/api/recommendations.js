const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Interest,Value,Feed,Post,Connection,Comment } = require('../../db/models');

const router = express.Router();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

router.get("/:userId",requireAuth,asyncHandler(async (req,res) => {
    const {userId} = req.params
    const userInterests = await Interest.findAll({where:{userId:userId}})
    console.log(userInterests,"USER INTERESTTTTTTTTTTTTTTTT")
    const userValues = await Value.findAll({where:{userId:userId}})
    if (userInterests.length > 1 || userValues.length > 1){
        const interestTagArray = userInterests.map((interest) => {
            return interest.tag
        })
        const valueTagArray = userValues.map((value) => {
            return value.tag
        })
        const matchingInterests = await Interest.findAll({order: [ [ Sequelize.fn('RANDOM') ] ], limit: 5,where:{tag: {[Sequelize.Op.in]:interestTagArray},[Sequelize.Op.not]: {userId:userId}}})
        const matchingValues = await Value.findAll({order: [ [ Sequelize.fn('RANDOM') ] ], limit: 5,where:{tag:{[Sequelize.Op.in]: valueTagArray},[Sequelize.Op.not]: {userId:userId}}})
        // console.log(matchingValues,"matching VALUES_______________________________")
        if (!matchingInterests && !matchingValues) {
            const findUsers = await User.findAll({order: [ [ Sequelize.fn('RANDOM') ] ] , limit: 5})
            const randomizeUsers = shuffleArray(findUsers)
            const matchingUser = randomizeUsers[0]
            return res.json({matchingUser})
        }

        const bothValuesandInterests = [...matchingInterests,...matchingValues]
        // console.log("_________________________",bothValuesandInterests,"__________________________")
        const matchingUsers = await Promise.all(bothValuesandInterests.map(async (matchCritera) => {
            return await User.findByPk(matchCritera.userId,
                {
                  include: [ 
                      {model: Value,where:{userId:matchCritera.userId}},
                      {model:Interest,where:{userId:matchCritera.userId}},
                      {model:Feed,where:{userId:matchCritera.userId},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
                      {model:Connection,as: "Requests",where:{accepted:false,requestedUser:matchCritera.userId},required:false,include:[{model:User}]},
                      {model:Connection,as: "Network",where:{accepted:true, [Sequelize.Op.or]: [{requestedUser:matchCritera.userId},{requestingUser:matchCritera.userId}]},required:false,include:[{model:User}]}
                        // ,required:false,include: [
                    //     {model:Feed,where:{userId:matchCritera.userId},include: [{model: Post,required:false,include:[{model: Comment,required:false,include:[{model:User}]}]}]}]}]}             
                  ]
                }
              )
        }))
        // console.log(matchingUsers,"HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        
        shuffleArray(matchingUsers)
        const matchingUser = matchingUsers[0]
        return res.json({
            matchingUser
          });
    }
}))

module.exports = router;
