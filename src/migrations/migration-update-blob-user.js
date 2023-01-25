module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'image', {
        type: Sequelize.BYTEA('long'),
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
