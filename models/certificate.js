'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Certificate.belongsTo(models.Enrollment, {
        foreignKey: 'enrollment_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Certificate.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Certificate.init({
    enrollment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    certificate_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Certificate',
  });
  return Certificate;
};