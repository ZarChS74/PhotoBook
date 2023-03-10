'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up(queryInterface, Sequelize) {
    return queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photoName: {
        type: Sequelize.STRING
      },
      photoDetail: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      AlbumId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PhotoAlbums",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
 down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Photos');
  }
};