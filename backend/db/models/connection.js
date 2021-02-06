'use strict';
module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define('Connection', {
    requestingUser: DataTypes.INTEGER,
    requestedUser: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN,
    warm_up_response: DataTypes.STRING
  }, {});
  Connection.associate = function(models) {
    Connection.belongsTo(models.User,{through:"Network",foreignKey:"requestingUser"})
    Connection.belongsTo(models.User,{through:"Requests",foreignKey:"requestedUser"})
  };
  return Connection;
};