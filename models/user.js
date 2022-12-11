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
        allowNull: false,
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kota: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provinsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.STRING,
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
