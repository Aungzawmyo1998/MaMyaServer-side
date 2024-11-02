'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Forum.belongsTo(models.User, {
        foreignKey: 'user_id', //
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Forum.belongsTo(models.Course, {
        foreignKey: 'course_id', //
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Forum.init({
    course_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    post_content: DataTypes.TEXT,
    post_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Forum',
  });
  return Forum;
};