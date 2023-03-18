"use strict";

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      permintaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      biayaPembangunan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estimasiWaktu: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      biayaHarian: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      biayaTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doneByPenyewa: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      doneByPekerja: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      review: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imageReview: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_penyewa: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_pekerja: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
