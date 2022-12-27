'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_info extends Model {
    static associate(models) {
      Doctor_info.belongsTo(models.User, { foreignKey: 'doctorId' });
      Doctor_info.belongsTo(models.Allcode, { foreignKey: 'provinceId', as: 'provinceTypeData', targetKey: 'keyMap' });
    }
  }
  Doctor_info.init(
    {
      doctorId: DataTypes.INTEGER,
      provinceId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Doctor_info',
      freezeTableName: true,
    }
  );
  return Doctor_info;
};
