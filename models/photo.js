'use strict';
const {
  Model, Op
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

    static createdAtFormatter() {
      return this.createdAt.toISOString().split("T")[0];
    }

    static photoFinder(search) {
      return Photo.findAll({
        include: ['Tags','User'],
        where: { photoDetail: { [Op.iLike]: `%${search}%` } }
    })
    }

    tagJoiner() {
      return this.Tags.map(el => el.tagName).join(", ");
    }
  }
  Photo.init({
    photoUrl: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg : 'Photo Url cannot be empty'
        },
        notNull : {
          msg : 'Photo Url cannot be null'
        }
      }
    },
    photoDetail: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg : 'Photo Detail cannot be empty'
        },
        notNull : {
          msg : 'Photo Detail cannot be null'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    PhotoAlbumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};