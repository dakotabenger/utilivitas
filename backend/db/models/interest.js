'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    tag: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Interest.associate = function(models) {
Interest.belongsTo(models.User,{foreignKey:"userId"})
  };
  return Interest;
};