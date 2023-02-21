function createModelUser(Sequelize, DataTypes) {
  const User = Sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kecamatan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kota: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provinsi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      priceRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isWorking: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "users",
    }
  );
  return User;
}

module.exports = createModelUser;
