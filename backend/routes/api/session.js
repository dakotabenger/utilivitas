const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User,Post,Comment,Connection,Feed,Value,Interest } = require("../../db/models");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const loggedInUser = await User.login({ credential, password });

    if (!loggedInUser) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    const user = await User.findByPk(loggedInUser.id,
                {
                  include: [ 
                      {model: Value,where:{userId:loggedInUser.id}},
                      {model:Interest,where:{userId:loggedInUser.id}},
                      {model:Feed,where:{userId:loggedInUser.id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
                      {model:Connection,as: "Requests",where:{accepted:false,requestedUser:loggedInUser.id},required:false,include:[{model:User,include:[{model: Value,where:{userId:loggedInUser.id}},
                      {model:Interest,where:{userId:loggedInUser.id}},
                      {model:Feed,where:{userId:loggedInUser.id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]}]}]},
                      {model:Connection,as: "Network",where:{accepted:true},required:false,include:[{model:User,include:[{model: Value,where:{userId:loggedInUser.id}},
                        {model:Interest,where:{userId:loggedInUser.id}},
                        {model:Feed,where:{userId:loggedInUser.id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]}]}]}             
                  ]
                }
              )
        
    await setTokenCookie(res, loggedInUser);

    return res.json({
      user,
    });
  }),
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  async (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: await User.findByPk(user.id,
                {
                  include: [ 
                      {model: Value,where:{userId:user.id}},
                      {model:Interest,where:{userId:user.id}},
                      {model:Feed,where:{userId:user.id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]},
                      {model:Connection,as: "Requests",where:{accepted:false,requestedUser:user.id},required:false,include:[{model:User,include:[{model: Value,where:{userId:user.id}},
                      {model:Interest,where:{userId:user.id}},
                      {model:Feed,where:{userId:user.id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]}]}]},
                      {model:Connection,as: "Network",where:{accepted:true},required:false,include:[{model:User,include:[{model: Value,where:{userId:user.id}},
                        {model:Interest,where:{userId:user.id}},
                        {model:Feed,where:{userId:user.id},include: [{model: Post,include:[{model: Comment,include:[{model:User}]},{model:User}]}]}]}]}             
                  ]
                }
              )
        
      });
    } else return res.json({});
  }
);

module.exports = router;