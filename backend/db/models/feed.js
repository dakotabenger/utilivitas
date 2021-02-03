'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feed = sequelize.define('Feed', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
    }, {});
  Feed.associate = function(models) {
    Feed.belongsTo(models.User,{foreignKey:"userId"})
    Feed.hasMany(models.Post,{foreignKey:"feedId"})
  };
  return Feed;
};