const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Op } = require("sequelize");

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Interest,Value,Feed,Post,Comment,Connection} = require('../../db/models');

const router = express.Router();

router.post(
    '/:feedId/:userId',
    requireAuth,
    asyncHandler(async (req, res) => {
      const {postText} = req.body;
      const {feedId,userId} = req.params
      const feed = await Feed.findByPk(feedId)
      const canPost = await Connection.findOne({where:{[Op.and]: [{requestedUser:{[Op.or]:[userId,feedId]}},{requestingUser:{[Op.or]:[userId,feedId]}}]}})
      if (canPost) {
        const newPost = await Post.create({feedId,userId,postText}) 

      } else {
        
        const userWithProfileData = await User.findByPk(user.id,
            {
              include: [ 
                  {model: Value,where:{userId:user.id}},
                  {model:Interest,where:{userId:user.id}},
                  {model:Feed,where:{userId:user.id},include: [{model: Post,include:[{model: Comment}]}]},
                  {model:Connection,where:{accepted:true},required:false},      
                ]})    
                return res.json({
                    userWithProfileData,
                    "message":"You can't post on this feed."
                  });
      }



      const userWithProfileData = await User.findByPk(user.id,
        {
          include: [ 
              {model: Value,where:{userId:user.id}},
              {model:Interest,where:{userId:user.id}},
              {model:Feed,where:{userId:user.id},include: [{model: Post,include:[{model: Comment}]}]},
              {model:Connection,where:{accepted:true},required:false},      
            ]})
      await setTokenCookie(res, user);
      // console.log(user,"USER CREATE___________________")
      console.log(userWithProfileData, "USERWITHPROFILEDATA___________________________")
      
      return res.json({
        userWithProfileData
      });
    })
  );


module.exports = router;
