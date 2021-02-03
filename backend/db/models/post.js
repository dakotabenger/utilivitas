'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postText: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    feedId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User,{foreignKey:"userId"})
    Post.belongsTo(models.Feed,{foreignKey:"feedId"})
    Post.hasMany(models.Comment,{foreignKey:"postId"})}
  return Post;
};