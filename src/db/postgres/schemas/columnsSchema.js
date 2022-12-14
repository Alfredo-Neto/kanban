const Sequelize = require("sequelize");

const columnsSchema = {
  name: "columns",
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      required: true,
    },
    // panelId: {
    //   type: Sequelize.INTEGER,
    //   references: "panels",
    //   referencesKey: "id",
    // },
  },
  options: {
    //opcoes para base existente
    tableName: "COLUMNS",
    freezeTableName: false,
    timestamps: false,
  },
};

module.exports = columnsSchema;
