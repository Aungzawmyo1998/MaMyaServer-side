'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Instructor, {
        foreignKey: 'instructor_id', // Foreign key in Course model
        onDelete: 'CASCADE'
      });
      Course.belongsTo(models.Category, {
        foreignKey: 'category_id', // Foreign key in Course model
        onDelete: 'CASCADE'
      });

      Course.hasMany(models.Forum, {
        foreignKey: 'course_id', // Foreign key in Forum model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Course.hasMany(models.Lesson, {
        foreignKey: 'course_id', // Foreign key in Lesson model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Course.hasMany(models.Enrollment, {
        foreignKey: 'course_id', // Foreign key in Enrollment model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Course.hasMany(models.Payment, {
        foreignKey: 'course_id', // Foreign key in Payment model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Course.hasMany(models.Review, {
        foreignKey: 'course_id', // Foreign key in Review model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Course.init({
    instructor_id: DataTypes.INTEGER,
    course_title: DataTypes.STRING,
    course_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};