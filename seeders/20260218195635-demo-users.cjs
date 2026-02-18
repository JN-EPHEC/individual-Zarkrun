'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Jean',
        lastName: 'Dupont',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Marie',
        lastName: 'Martin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
