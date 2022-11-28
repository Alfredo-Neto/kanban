const ContextStrategy = require("../db/strategies/base/contextStrategy");
const PostgresStrategy = require("../db/strategies/postgresStrategy");
const panelsSchema = require("../db/postgres/schemas/panelsSchema");
const columnsSchema = require("../db/postgres/schemas/columnsSchema");
const tasksSchema = require("../db/postgres/schemas/tasksSchema");
const { equal, deepEqual } = require("assert");
const MOCK_PANEL_CREATE = { title: "Construir kanban" };
const MOCK_COLUMN_CREATE = { title: "Em progresso" };
const MOCK_TASK_CREATE = { title: "Primeira task" };

let panel = {};
let column = {};
let task = {};

describe("Postgres Strategy", function () {
  before(async () => {
    const connection = await PostgresStrategy.connect();

    const panelModel = await PostgresStrategy.defineModel(connection, panelsSchema);
    const columnModel = await PostgresStrategy.defineModel(connection, columnsSchema);
    const taskModel = await PostgresStrategy.defineModel(connection, tasksSchema);

    panel = new ContextStrategy(new PostgresStrategy(connection, panelModel));
    column = new ContextStrategy(new PostgresStrategy(connection, columnModel));
    task = new ContextStrategy(new PostgresStrategy(connection, taskModel));

    await panel.delete();
    await column.delete();
    await task.delete();

    await panel.create(MOCK_PANEL_CREATE);
    await column.create(MOCK_COLUMN_CREATE);
    await task.create(MOCK_TASK_CREATE);
  });

  it("Panel is connected", async () => {
    const result = await panel.isConnected();
    equal(result, true);
  });

  it("Panel create", async () => {
    const result = await panel.create(MOCK_PANEL_CREATE);
    delete result.dataValues.id;
    deepEqual(result.dataValues, MOCK_PANEL_CREATE);
  });

  it("Panel read", async () => {
    const [result] = await panel.read(MOCK_PANEL_CREATE);
    delete result.id;
    deepEqual(result, MOCK_PANEL_CREATE);
  });

  it("Panel update", async () => {
    const [item] = await panel.read({});
    const newItem = {
      title: "Construir outra coisa",
    };
    const [result] = await panel.update(item.id, newItem);
    deepEqual(result, 1);
  });

  it("Panel delete", async () => {
    const [item] = await panel.read({});
    const result = await panel.delete(item.id);
    deepEqual(result, 1);
  });

  it("Column is connected", async () => {
    const result = await column.isConnected();
    equal(result, true);
  });

  it("Column create", async () => {
    const result = await column.create(MOCK_COLUMN_CREATE);
    delete result.dataValues.id;
    deepEqual(result.dataValues, MOCK_COLUMN_CREATE);
  });

  it("Column read", async () => {
    const [result] = await column.read(MOCK_COLUMN_CREATE);
    delete result.id;
    deepEqual(result, MOCK_COLUMN_CREATE);
  });

  it("Column update", async () => {
    const [item] = await column.read({});
    const newItem = {
      title: "Construir outra coisa",
    };
    const [result] = await column.update(item.id, newItem);
    deepEqual(result, 1);
  });

  it("Column delete", async () => {
    const [item] = await column.read({});
    const result = await column.delete(item.id);
    deepEqual(result, 1);
  });

  it("Task is connected", async () => {
    const result = await task.isConnected();
    equal(result, true);
  });

  it("Task create", async () => {
    const result = await task.create(MOCK_TASK_CREATE);
    delete result.dataValues.id;
    deepEqual(result.dataValues, MOCK_TASK_CREATE);
  });

  it("Task read", async () => {
    const [result] = await task.read(MOCK_TASK_CREATE);
    delete result.id;
    deepEqual(result, MOCK_TASK_CREATE);
  });

  it("Task update", async () => {
    const [item] = await task.read({});
    const newItem = {
      title: "Construir outra coisa",
    };
    const [result] = await task.update(item.id, newItem);
    deepEqual(result, 1);
  });

  it("Task delete", async () => {
    const [item] = await task.read({});
    const result = await task.delete(item.id);
    deepEqual(result, 1);
  });
});
