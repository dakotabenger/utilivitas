const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Interest,Value,Feed,Connection,Post,Comment, } = require('../../db/models');

const router = express.Router();

router.post(
  '/act/:connectionId',
    requireAuth,
    asyncHandler(async (req, res) => {
      const {connectionId} = req.params
        const {approvedStatus} = req.body
        const updatedConnection = await Connection.findByPk(connectionId)
        if (approvedStatus === true) {
            updatedConnection.accepted = true
            await updatedConnection.save()
          } else {
            const connectionToDestroy = await Connection.findByPk(connectionId)
            await connectionToDestroy.destroy()
          }
          
          const userWithProfileData = User.findByPk(updatedConnection.requestedUser,
            {
              include: [ 
                  {model: Value,where:{userId:updatedConnection.requestedUser}},
                  {model:Interest,where:{userId:updatedConnection.requestedUser}},
                  {model:Feed,where:{userId:updatedConnection.requestedUser},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
                  {model:Connection,as: "Requests",where:{accepted:false,requestedUser:updatedConnection.requestedUser},required:false,include:[{model:User}]},
                  {model:Connection,as: "Network",where:{accepted:true, [Sequelize.Op.or]: [{requestedUser:updatedConnection.requestedUser},{requestingUser:updatedConnection.requestedUser}]},required:false,include:[{model:User}]}
                    // ,required:false,include: [
                //     {model:Feed,where:{userId:updatedConnection.requestedUser},include: [{model: Post,required:false,include:[{model: Comment,required:false,include:[{model:User}]}]}]}]}]}             
              ]
            }
          )
                  
                  return res.json({
                    userWithProfileData
      });
    })
    );
    
    router.post(
        '/:requestingUserId/:requestedUserId',
        requireAuth,
        asyncHandler(async (req, res) => {
              const {requestingUserId, requestedUserId} = req.params
              console.log(requestedUserId,requestingUserId,"_______________________IDS_______________")
              const {warm_up_response} = req.body
              const newConnection = await Connection.create({requestedUser:requestedUserId,requestingUser:requestingUserId,warm_up_response,accepted:false})
              console.log(newConnection,"HEREEEEEEEEEEEEEEEEEEEEEEEEEE____________________________________________________________________________________________________")
              const userWithProfileData = User.findByPk(requestingUserId,
                {
                  include: [ 
                      {model: Value,where:{userId:requestingUserId}},
                      {model:Interest,where:{userId:requestingUserId}},
                      {model:Feed,where:{userId:requestingUserId},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
                      {model:Connection,as: "Requests",where:{accepted:false,requestedUser:requestingUserId},required:false,include:[{model:User}]},
                      {model:Connection,as: "Network",where:{accepted:true, [Sequelize.Op.or]: [{requestedUser:requestingUserId},{requestingUser:requestingUserId}]},required:false,include:[{model:User}]}
                        // ,required:false,include: [
                    //     {model:Feed,where:{userId:requestingUserId},include: [{model: Post,required:false,include:[{model: Comment,required:false,include:[{model:User}]}]}]}]}]}             
                  ]
                }
              )
        
          
          return res.json({
            userWithProfileData
          });
        })
      );
    
    
    module.exports = router;
    