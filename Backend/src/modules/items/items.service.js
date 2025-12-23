const db = require("../../config/db");

exports.getItems = async () => {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  return result.rows;
};
exports.createItems = async (data) => {
  const {
    i_type,
    supp_id,
    i_code,
    i_name,
    i_status,
    i_stock,
    is_internal,
    is_sellable,
  } = data;
  if (
    !i_type ||
    !supp_id ||
    !i_name ||
    !i_status ||
    is_internal === undefined ||
    is_sellable === undefined
  ) {
    throw new Error("All fields are required");
  }

  const result = await db.query(
    `
  INSERT INTO items (
    i_type,
    supp_id,
    i_code,
    i_name,
    i_status,
    is_internal,
    is_sellable
  )
  VALUES (
    $1,
    $2,
    CONCAT(
      'ITEM',
      EXTRACT(YEAR FROM NOW()),
      EXTRACT(MONTH FROM NOW()),
      LPAD(nextval('item_code')::text, 4, '0')
    ),
    $3,
    $4,
    $5,
    $6
  )
  RETURNING *
  `,
    [i_type, supp_id, i_name, i_status, is_internal, is_sellable]
  );

  return result.rows[0];
};
exports.updateItems = async (id, data) => {
  const {
    i_type,
    supp_id,
    i_name,
    i_status,
    i_stock,
    is_internal,
    is_sellable,
  } = data;

  const result = await db.query(
    ` UPDATE items SET
            i_type = COALESCE($1, i_type),
            supp_id = COALESCE($2, supp_id),
            i_name = COALESCE($3, i_name),
            i_status = COALESCE($4, i_status),
            i_stock = COALESCE($5, i_stock),
            is_internal = COALESCE($6, is_internal),
            is_sellable = COALESCE($7, is_sellable)
        WHERE id = $8 RETURNING *`,
    [
      data.i_type,
      data.supp_id,
      data.i_name,
      data.i_status,
      data.i_stock,
      data.is_internal,
      data.is_sellable,
      id,
    ]
  );
  if (result.rowCount === 0) {
    throw new Error("Item not found");
  }
  return result.rows[0];
};
exports.deleteItems = async (id) => {
  const result = await db.query("DELETE FROM items WHERE id = $1 RETURNING *", [
    id,
  ]);
  if (result.rowCount === 0) {
    throw new Error("Item not found");
  }
  return result.rows[0];
};
