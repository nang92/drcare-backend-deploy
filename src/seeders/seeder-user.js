'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'info@thang.me',
        password: '123456',
        firstName: 'Thang',
        lastName: 'Le',
        address: 'Berlin',
        phonenumber: '+49 123456789',
        gender: 1,
        image: 'https://i.imgur.com/1Q9ZQ3r.jpg',
        roleId: '1',
        positionId: '1',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
