const ICrud = require("./base/ICrud");
const Sequelize = require("sequelize");

class PostgresStrategy extends ICrud {
  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }

  static async connect() {
    const connection = new Sequelize(
      "kanban", //database
      "alfredoneto", // user
      "minhasenhasecreta", //senha
      {
        host: "localhost",
        dialect: "postgres",
        // case sensitive
        quoteIdentifiers: false,
        // deprecation warning
        operatorsAliases: false,
        logging: false,

        // dialectOptions: {
        //   ssl: true,
      }
    );
    return connection;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  create(item) {
    return this._schema.create(item, { raw: true });
  }

  read(item) {
    return this._schema.findAll({ where: item, raw: true });
  }

  update(id, item) {
    return this._schema.update(item, { where: { id } });
  }

  delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }
}

module.exports = PostgresStrategy;
