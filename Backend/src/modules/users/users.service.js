const db = require("../../config/db");

exports.getUsers = async () => {
  const result = await db.query("SELECT * FROM users ORDER BY id ASC");
  return result.rows;
};
exports.createUsers = async (data) => {
  const { role_id, name, password, email, status } = data;
  if (!role_id || !name || !password || !email || !status) {
    throw new Error("All fields are required");
  }
  const result = await db.query(
    "INSERT INTO users (role_id, name, password, email, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [role_id, name, password, email, status]
  );
  return result.rows[0];
};
exports.updateUsers = async (id, data) => {
  const { role_id, name, email, password, status } = data;
  const result = await db.query(
    ` UPDATE users SET
            role_id = COALESCE($1, role_id),
            name = COALESCE($2, name),
            password = COALESCE($3, password),
            email = COALESCE($4, email),
            status = COALESCE($5, status)
        WHERE id = $6 RETURNING *`,
    [data.role_id, data.name, data.password, data.email, data.status, id]
  );
  if (result.rowCount === 0) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
exports.deleteUsers = async (id) => {
  const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [
    id,
  ]);
  if (result.rowCount === 0) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
