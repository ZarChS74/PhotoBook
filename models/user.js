'use strict';
const {
  Model
} = require('sequelize');

var bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Photo);
      User.hasMany(models.PhotoAlbum)
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);
      /*
        #encrypt dari static method encryptedPassword akan sama dengan string
        hasil enkripsi password dari method #encrypt
      */

      return this.create({ username, password: encryptedPassword });
    };

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    static authenticate =  ({ username, password }) => {
      try {
        const user = this.findOne({ where: { username } });
        if (!user) return Promise.reject("User Not Found!");
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Wrong Password");
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };
    
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options){
        console.log(instance,);
        instance.password = "secure"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};