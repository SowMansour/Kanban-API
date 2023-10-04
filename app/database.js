const pg = require('pg');

const Client = pg.Client;

const client = new Client(process.env.PG_URL);

client.connect();

module.exports = client;