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
        phoneNumber: faker.phone.number(), // '961-770-7727'
        kelurahan: 'Tambak Bayan',
        kecamatan: 'Condong Catur',
        kota: "sleman",
        provinsi: "DIY",
        rating: Math.floor((Math.random() * 5)),
        id_role: 1
    }
    data.push(newUser);
  }
  return data;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", generateUser(10));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
