function applyExtraSetup(sequelize) {
  const { User, Role, Order } = sequelize.models;

  Role.hasMany(User, {
    foreignKey: "id_role",
    targetKey: "id",
  });

  User.belongsTo(Role, {
    foreignKey: "id_role",
    targetKey: "id",
  });

  User.hasMany(Order, {
    foreignKey: "id_penyewa",
    targetKey: "id",
  });

  User.hasMany(Order, {
    foreignKey: "id_pekerja",
    targetKey: "id",
  });

  Order.belongsTo(User, {
    foreignKey: "id_penyewa",
    targetKey: "id",
    as: "Penyewa",
  });

  Order.belongsTo(User, {
    foreignKey: "id_pekerja",
    targetKey: "id",
    as: "Pekerja",
  });
}

module.exports = applyExtraSetup;
