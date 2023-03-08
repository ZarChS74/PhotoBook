'use strict';

const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8")).map(el =>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    console.log(data);
   return queryInterface.bulkInsert('Users', data)
  },

 down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', null, {})
  }
};
