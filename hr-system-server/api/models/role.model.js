'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department',
        onDelete: 'CASCADE'
      });
    }
  }
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avgCompensation: {
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
    modelName: 'Role',
    tableName: 'Role',
    timestamps: true
  });
  return Role;
};