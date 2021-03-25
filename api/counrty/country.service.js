const db = require('_helpers/db');

async function getAll() {
  return await db.Country.findAll();
}

module.exports = { getAll };