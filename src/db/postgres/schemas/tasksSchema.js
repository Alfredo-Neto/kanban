const Sequelize = require("sequelize");

const tasksSchema = {
  name: "tasks",
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
    // columnId: {
    //   type: Sequelize.INTEGER,
    //   references: "columns",
    //   referencesKey: "id",
    // },
  },
  options: {
    //opcoes para base existente
    tableName: "TASKS",
    freezeTableName: false,
    timestamps: false,
  },
};

module.exports = tasksSchema;
