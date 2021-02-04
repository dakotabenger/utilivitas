'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User,Post,Comment,Connection,Feed,Value,Interest } = require("../../db/models");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      warm_up_question: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photoUrl: {
        type: DataTypes.STRING
      },
      occupation: {
        type: DataTypes.STRING
      }
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Value,{foreignKey:"userId"})
    User.hasMany(models.Post,{foreignKey:"userId"})
    User.hasMany(models.Interest,{foreignKey:"userId"})
    User.hasMany(models.Feed,{foreignKey:"userId"})
    User.hasMany(models.Comment,{foreignKey:"userId"})
    User.hasMany(models.Connection,{as:"Network",foreignKey:"requestingUser"})
    User.hasMany(models.Connection,{as:"Requests",foreignKey:"requestingUser"})
    User.hasMany(models.Connection,{foreignKey:"requestedUser"})
  };
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.findByPk(user.id
        // {
        //   include: [ 
        //       {model: Value,where:{userId:user.id}},
        //       {model:Interest,where:{userId:user.id}},
        //       {model:Feed,where:{userId:user.id},include: {model: Post,include:{model: Comment}}},
        //       {model:Connection,where:{accepted:true},required:false},      
        //    ] }
      );
    }
  };

  User.signup = async function ({ username, email, password,bio,age,occupation,warm_up_question,photoUrl }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      bio,
      age,
      occupation,
      warm_up_question,
      photoUrl
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  return User;
};
