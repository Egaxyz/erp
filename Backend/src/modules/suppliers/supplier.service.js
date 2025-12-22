const db = require("../../config/db");

exports.getSupplier = async () => {
  const result = await db.query("SELECT * FROM supplier ORDER BY id ASC");
  return result.rows;
};
exports.createSupplier = async (data) => {
  const { supp_name, email, address, supp_sts } = data;

  if (!supp_name || !email || !address || !supp_sts) {
    throw new Error("All fields are required");
  }

  const result = await db.query(
    "INSERT INTO supplier (supp_name, email, address, supp_sts) VALUES ($1, $2, $3, $4) RETURNING *",
    [supp_name, email, address, supp_sts]
  );
  return result.rows[0];
};
exports.updateSupplier = async (id, data) => {
  const { supp_name, email, address, supp_sts } = data;

  const result = await db.query(
    `
    UPDATE supplier SET
      supp_name = COALESCE($1, supp_name),
      email = COALESCE($2, email),
      address = COALESCE($3, address),
      supp_sts = COALESCE($4, supp_sts)
    WHERE id = $5 RETURNING *`,
    [supp_name, email, address, supp_sts, id]
  );
  if (result.rowCount === 0) {
    throw new Error("Supplier not found");
  }
  return result.rows[0];
};
exports.deleteSupplier = async (id) => {
  const result = await db.query(
    "DELETE FROM supplier WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    throw new Error("Supplier not found");
  }
  return result.rows[0];
};
