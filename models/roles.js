function createModelRole(Sequelize, DataTypes) {
  const Role = Sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "roles",
    }
  );
  return Role;
}

module.exports = createModelRole;
