'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthlyCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MonthlyCount.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE'
      });
    }
  }
  MonthlyCount.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    monthOfYear: {
      type: DataTypes.DATE,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    existingCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date().toISOString()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date().toISOString()
    }
  }, {
    sequelize,
    modelName: 'MonthlyCount',
    tableName: 'MonthlyCount',
    timestamps: true
  });
  return MonthlyCount;
};