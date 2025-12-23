const db = require("../../../config/db");

exports.getPermissions = async () => {
  const result = await db.query("SELECT * FROM permission ORDER BY id ASC");
  return result.rows;
};
exports.createPermissions = async (data) => {
  const { perm_name, description } = data;
  if (!perm_name || !description) {
    throw new Error("All fields are required");
  }

  const result = await db.query(
    "INSERT INTO permission (perm_name, description) VALUES ($1, $2) RETURNING *",
    [perm_name, description]
  );
  return result.rows[0];
};
exports.updatePermissions = async (id, data) => {
  const { perm_name, description } = data;

  const result = await db.query(
    `
      UPDATE permission SET
        perm_name = COALESCE($1, perm_name),
        description = COALESCE($2, description)
      WHERE id = $3 RETURNING *`,
    [perm_name, description, id]
  );
  if (result.rowCount === 0) {
    throw new Error("Permission not found");
  }
  return result.rows[0];
};
exports.deletePermissions = async (id) => {
  const result = await db.query(
    "DELETE FROM permission WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    throw new Error("Permission not found");
  }
  return result.rows[0];
};
