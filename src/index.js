const ContextStrategy = require("./db/strategies/base/contextStrategy");
const PostgresStrategy = require("./db/strategies/postgresStrategy");

contextPostgres = new ContextStrategy(new PostgresStrategy());

console.log(contextPostgres.create());
