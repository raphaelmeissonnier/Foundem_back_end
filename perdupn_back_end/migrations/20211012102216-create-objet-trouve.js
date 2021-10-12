'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ObjetTrouves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      intitule: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      categorie: {
        allowNull: false,
        type: Sequelize.ENUM('high tech', 'livre', 'fourniture de bureau', 'cartes', 'beauté et santé', 'garde-robe', 'equipement', 'autres')
      },
      status_trouve: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      latitude: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logitude: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ObjetTrouves');
  }
};