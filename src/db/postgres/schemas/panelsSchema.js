const Sequelize = require("sequelize");

const panelsSchema = {
  name: "panels",
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
  },
  options: {
    //opcoes para base existente
    tableName: "PANELS",
    freezeTableName: false,
    timestamps: false,
  },
};

module.exports = panelsSchema;
