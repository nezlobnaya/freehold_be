const db = require("../../database/db");

module.exports = {
  getAll
};

function getAll() {
  return db.from("test").select("name");
}
