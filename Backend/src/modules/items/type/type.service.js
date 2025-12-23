const db = require("../../../config/db");

exports.getTypes = async () => {
  const result = await db.query("SELECT * FROM type ORDER BY id ASC");
  return result.rows;
};
exports.createTypes = async (data) => {
  const { name } = data;
  if (!name) {
    throw new Error("Name is required");
  }

  const result = await db.query(
    "INSERT INTO type (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};
exports.updateTypes = async (id, data) => {
  const { name } = data;

  if (!name) {
    throw new Error("Name is required");
  }

  const result = await db.query(
    `UPDATE type SET
            name = COALESCE($1, name)
        WHERE id = $2 RETURNING *`,
    [name, id]
  );
  if (result.rowCount === 0) {
    throw new Error("Type not found");
  }
  return result.rows[0];
};
exports.deleteTypes = async (id) => {
  const result = await db.query("DELETE FROM type WHERE ID = $1 RETURNING *", [
    id,
  ]);

  if (result.rowCount === 0) {
    throw new Error("Type not found");
  }
  return result.rows[0];
};
