'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', as: 'timeTypeData', targetKey: 'keyMap' });
      Schedule.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctorData', targetKey: 'id' });
    }
  }
  Schedule.init(
    {
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Schedule',
    }
  );
  return Schedule;
};
