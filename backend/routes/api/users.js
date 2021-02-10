const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Interest,Value,Feed,Post,Comment,Connection } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username,age,bio,valueTags,interestTags,valueDescription,interestDescription,occupation,warm_up_question,
      photoUrl } = req.body;
    const user = await User.signup({ email, username, password,age,bio,occupation,warm_up_question,photoUrl });
    const feed = await Feed.create({name:`${username}'s Personal Feed`,userId:user.id})
    const interests = await Promise.all(interestTags.map(async (interesttag) => {
      const newInterestRow = await Interest.create({tag:interesttag.id,userId:user.id,description:interestDescription})
      // console.log(newInterestRow,"________________________NEW INTEREST_____________________________")
    }));
    const values = await Promise.all(valueTags.map(async (valuetag) => {
      const newValueRow = await Value.create({tag:valuetag.id,userId:user.id,description:valueDescription})
      console.log(newValueRow,"________________________NEW Value_____________________________")
    }));
    const userWithProfileData = await User.findByPk(user.id,
      {
        include: [ 
            {model: Value,where:{userId:user.id}},
            {model:Interest,where:{userId:user.id}},
            {model:Feed,where:{userId:user.id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
            {model:Connection,as: "Requests",where:{accepted:false,requestedUser:user.id},required:false,include:[{model:User}]},
            {model:Connection,as: "Network",where:{accepted:true, [Sequelize.Op.or]: [{requestedUser:user.id},{requestingUser:user.id}]},required:false,include:[{model:User}]}
              // ,required:false,include: [
          //     {model:Feed,where:{userId:user.id},include: [{model: Post,required:false,include:[{model: Comment,required:false,include:[{model:User}]}]}]}]}]}             
        ]
      }
    )
        
    await setTokenCookie(res, user);
    // console.log(user,"USER CREATE___________________")
    // console.log(userWithProfileData, "USERWITHPROFILEDATA___________________________")
    
    return res.json({
      userWithProfileData
    });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} = req.params
    const userWithProfileData = await User.findByPk(id,
      {
        include: [ 
            {model: Value,where:{userId:id}},
            {model:Interest,where:{userId:id}},
            {model:Feed,where:{userId:id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
            {model:Connection,as: "Requests",where:{accepted:false,requestedUser:id},required:false,include:[{model:User}]},
            {model:Connection,as: "Network",where:{accepted:true, [Sequelize.Op.or]: [{requestedUser:id},{requestingUser:id}]},required:false,include:[{model:User}]}
              // ,required:false,include: [
          //     {model:Feed,where:{userId:id},include: [{model: Post,required:false,include:[{model: Comment,required:false,include:[{model:User}]}]}]}]}]}             
        ]
      }
    )

  
    
    return res.json({
      userWithProfileData
    });
  })
);

module.exports = router;
