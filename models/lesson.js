'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.Course, {
        foreignKey: 'course_id', // Foreign key in Lesson model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Lesson.init({
    course_id: DataTypes.INTEGER,
    lesson_title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};