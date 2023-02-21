'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */

async function generateUser(rowCount) {
  const data = [];
  for (let i = 0; i < rowCount; i++) {
    let newUser = {
        fullName: faker.name.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('qwertyuiop',10),
        img: faker.image.avatar(),
        phoneNumber: "081295175352",
        kelurahan: 'Tambak Bayan',
        kecamatan: 'Condong Catur',
        kota: "sleman",
        provinsi: "DIY",
        priceRate: 100000,
        rating: 5,
        id_role: 1
    }
    data.push(newUser);
  }
  return data;
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", await generateUser(10));
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
     
  }
};
