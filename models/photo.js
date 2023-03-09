'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User);
      Photo.belongsTo(models.PhotoAlbum);
      Photo.belongsToMany(models.Tags, { through: models.PhotoTags });
    }
  }
  Photo.init({
    photoUrl: DataTypes.STRING,
    photoDetail: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PhotoAlbumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};