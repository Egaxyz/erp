const db = require("../../../config/db");

exports.getRoles = async () => {
  const result = await db.query("SELECT * FROM role ORDER BY id ASC");
  return result.rows;
};
exports.createRoles = async (data) => {
  const { role_name } = data;
  if (!role_name) {
    throw new Error("Role name is required");
  }

  const result = await db.query(
    "INSERT INTO role (role_name) VALUES ($1) RETURNING *",
    [role_name]
  );
  return result.rows[0];
};
exports.updateRoles = async (id, data) => {
  const { role_name } = data;

  const result = await db.query(
    `
      UPDATE role SET
        role_name = COALESCE($1, role_name)
        WHERE id = $2 RETURNING *`,
    [role_name, id]
  );
  if (result.rowCount === 0) {
    throw new Error("Role not found");
  }
  return result.rows[0];
};
exports.deleteRoles = async (id) => {
  const result = await db.query("DELETE FROM role WHERE id = $1 RETURNING *", [
    id,
  ]);
  if (result.rowCount === 0) {
    throw new Error("Role not found");
  }
  return result.rows[0];
};
exports.getRolesWithPermissions = async () => {
  const result = await db.query(
    "SELECT * FROM role_permission ORDER BY id ASC"
  );
  return result.rows;
};
exports.assignPermissionsToRole = async (data) => {
  const { role_id, perm_id } = data;
  if (!role_id || !perm_id) {
    throw new Error("Role must have at least one permission");
  }
  const result = await db.query(
    "INSERT INTO role_permission (role_id, perm_id) VALUES ($1, $2) RETURNING *",
    [role_id, perm_id]
  );
  return result.rows[0];
};
exports.removePermissionsFromRoles = async (id) => {
  const result = await db.query(
    "DELETE FROM role_permission WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    throw new Error("Role-Permission association not found");
  }
  return result.rows[0];
};
