'use strict';
module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define('Connection', {
    requestingUser: DataTypes.INTEGER,
    requestedUser: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN,
    warm_up_response: DataTypes.STRING
  }, {});
  Connection.associate = function(models) {
    Connection.belongsTo(models.User,{foreignKey:"requestingUser"})
    Connection.belongsTo(models.User,{foreignKey:"requestedUser"})
  };
  return Connection;
};