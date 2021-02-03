'use strict';
module.exports = (sequelize, DataTypes) => {
  const Value = sequelize.define('Value', {
    tag: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Value.associate = function(models) {
    Value.belongsTo(models.User,{foreignKey:"userId"})
  };
  return Value;
};