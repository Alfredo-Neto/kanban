const ContextStrategy = require("../db/strategies/base/contextStrategy");
const PostgresStrategy = require("../db/strategies/postgresStrategy");
const panelsSchema = require("../db/postgres/schemas/panelsSchema");
const { equal, deepEqual } = require("assert");
const MOCK_PANEL_CREATE = { title: "Construir kanban" };

let context = {};

describe("Postgres Strategy", function () {
  before(async () => {
    const connection = await PostgresStrategy.connect();
    const model = await PostgresStrategy.defineModel(connection, panelsSchema);
    context = new ContextStrategy(new PostgresStrategy(connection, model));

    await context.delete();
    await context.create(MOCK_PANEL_CREATE);
  });

  it("is connected", async () => {
    const result = await context.isConnected();
    equal(result, true);
  });

  it("create", async () => {
    const result = await context.create(MOCK_PANEL_CREATE);
    delete result.dataValues.id;
    deepEqual(result.dataValues, MOCK_PANEL_CREATE);
  });

  it("read", async () => {
    const [result] = await context.read(MOCK_PANEL_CREATE);
    delete result.id;
    deepEqual(result, MOCK_PANEL_CREATE);
  });

  it("update", async () => {
    const [item] = await context.read({});
    const newItem = {
      title: "Construir outra coisa",
    };
    const [result] = await context.update(item.id, newItem);
    deepEqual(result, 1);
  });

  it("delete", async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    deepEqual(result, 1);
  });
});
