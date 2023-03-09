'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhotoAlbum.belongsTo(models.User);
      PhotoAlbum.hasMany(models.Photo);
    }

  }
  PhotoAlbum.init({
    albumName: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhotoAlbum',
  });
  return PhotoAlbum;
};