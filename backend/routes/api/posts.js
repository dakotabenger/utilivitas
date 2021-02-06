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
      console.log(feed,"_________________________________________________________________")
    //   const canPost = await Connection.findOne({where:{[Op.and]: [{requestedUser:{[Op.or]:[userId,feed.userId]}},{requestingUser:{[Op.or]:[userId,feed.userId]}}]}})
    //   console.log("_______________________",canPost,"________________________")
    //   if (canPost) {
        const newPost = await Post.create({feedId,userId,postText}) 

    //   } else {
        
        const userWithProfileData = await User.findByPk(matchCritera.userId,
            {
              include: [ 
                  {model: Value,where:{userId:matchCritera.userId}},
                  {model:Interest,where:{userId:matchCritera.userId}},
                  {model:Feed,where:{userId:matchCritera.userId},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
                  {model:Connection,as: "Requests",where:{accepted:false,requestedUser:matchCritera.userId},required:false,include:[{model:User,include:[{model: Value,where:{userId:matchCritera.userId}},
                  {model:Interest,where:{userId:matchCritera.userId}},
                  {model:Feed,where:{userId:matchCritera.userId},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]}]}]},
                  {model:Connection,as: "Network",where:{accepted:true},required:false,include:[{model:User,include:[{model: Value,where:{userId:matchCritera.userId}},
                    {model:Interest,where:{userId:matchCritera.userId}},
                    {model:Feed,where:{userId:matchCritera.userId},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]}]}]}             
              ]
            }
          )
       
                return res.json({
                    userWithProfileData,
                    // "message":"You can't post on this feed."
                  });
    //   }



//       const userWithProfileData = await User.findByPk(userId,
//         {
//           include: [ 
//               {model: Value,where:{userId:userId}},
//               {model:Interest,where:{userId:userId}},
//               {model:Feed,where:{userId:userId},include: [{model: Post,include:[{model: Comment}]}]},
//               {model:Connection,as: "Requests",where:{accepted:false,requestedUser:userId},required:false},
//               {model:Connection,as: "Network",where:{accepted:true},required:false}               ]})
//       await setTokenCookie(res, user);
//       // console.log(user,"USER CREATE___________________")
//       console.log(userWithProfileData, "USERWITHPROFILEDATA___________________________")
      
//       return res.json({
//         userWithProfileData
//       });
    })
  );


module.exports = router;
