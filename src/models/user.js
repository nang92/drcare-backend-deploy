'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', as: 'positionData', targetKey: 'keyMap' });
      User.belongsTo(models.Allcode, { foreignKey: 'gender', as: 'genderData', targetKey: 'keyMap' });
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' });
      User.hasOne(models.Doctor_info, { foreignKey: 'doctorId' });

      User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'doctorData' });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
