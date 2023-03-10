'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.PhotoAlbum);
      User.hasMany(models.Photo);
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        msg : 'Username has been taken'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username cannot be null'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be null'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg : 'Email must be formatted as email'
        },
        notNull: {
          msg: 'Email cannot be null'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeBulkCreate((user) => {
    user.password = bcrypt.hashSync(user.password, 10);
  })

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, 10);
  })

  return User;
};