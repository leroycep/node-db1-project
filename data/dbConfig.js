const knex = require("knex");

const knexfile = require("../knexfile.js");

// change to "production" and update knexfile.js to use postgres.
const database = process.env.KNEX_ENV || "development";

module.exports = knex(knexfile[database]);
