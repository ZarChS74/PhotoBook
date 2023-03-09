'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhotoTags.init({
    TagId: DataTypes.INTEGER,
    PhotoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhotoTags',
  });
  return PhotoTags;
};