'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.User, {
        foreignKey: 'user_id', // Foreign key in Payment Model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Payment.belongsTo(models.Course, {
        foreignKey: 'course_id', // Foreign key in Payment Model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Payment.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    payment_date: DataTypes.DATE,
    payment_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};