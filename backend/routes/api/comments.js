const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Interest,Value,Feed,Comment,Connection } = require('../../db/models');

const router = express.Router();

router.post(
    '/:postId/:userId',
    requireAuth,
    asyncHandler(async (req, res) => {
      const {commentText} = req.body;
      const {postId,userId} = req.params
      const feed = await Feed.findByPk(postId)
      const canPost = await Connection.findOne({where:{[Op.and]: [{requestedUser:{[Op.or]:[userId,postId]}},{requestingUser:{[Op.or]:[userId,postId]}}]}})
      if (canPost) {
        const newComment = await Comment.create({postId,userId,commentText}) 

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
    //   console.log(userWithProfileData, "USERWITHPROFILEDATA___________________________")
      
      return res.json({
        userWithProfileData
      });
    })
  );




module.exports = router;
