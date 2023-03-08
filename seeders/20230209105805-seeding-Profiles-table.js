'use strict';

const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {

    const data = JSON.parse(fs.readFileSync("./data/profiles.json", "utf-8")).map(el =>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
  return queryInterface.bulkInsert('Profiles', data)
  },

  down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Profiles', null, {})
  }
};
