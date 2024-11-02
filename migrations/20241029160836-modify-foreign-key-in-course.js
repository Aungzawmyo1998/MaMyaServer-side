'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Courses', {
      fields: ['instructor_id'],
      type: 'foreign key',
      references: {
        table: 'Instructors',
        field: 'id'
      },
      onDelete: 'CASCADE',  // Change from SET NULL to CASCADE
      onUpdate: 'CASCADE',
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
