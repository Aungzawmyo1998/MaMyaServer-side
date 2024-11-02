'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enrollment.hasMany(models.Certificate, {
        foreignKey: 'enrollment_id', // foreign key in Certificate model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Enrollment.belongsTo(models.User, {
        foreignKey: 'user_id', // foreign key in Enrollment model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Enrollment.belongsTo(models.Course, {
        foreignKey: 'course_id', // foreign key in Course model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Enrollment.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    enrollment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};