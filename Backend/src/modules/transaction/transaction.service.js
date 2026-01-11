const db = require("../../config/db");

exports.getTransaction = async () => {
  const result = await db.query("SELECT * FROM transactions ORDER BY id ASC");
  return result.rows;
};
exports.borrowItem = async (data, authUser) => {
  const { borrower_id, borrow_date, return_date, items } = data;

  const missingFields = [];

  if (!authUser?.id) missingFields.push("authUser.id");
  if (!borrower_id) missingFields.push("borrower_id");
  if (!borrow_date) missingFields.push("borrow_date");
  if (!return_date) missingFields.push("return_date");
  if (!items) missingFields.push("items");
  if (items && !items.length) missingFields.push("items (array is empty)");

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }
  const created_by = authUser.id;
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const transResult = await client.query(
      `
      INSERT INTO transactions (
        created_by,
        borrower_id,
        trans_code,
        borrow_date,
        return_date,
        trans_status
      )
      VALUES (
        $1,
        $2,
         CONCAT(
          'TRS',
          TO_CHAR(NOW(), 'YYYYMM'),
          LPAD(nextval('trans_code')::text, 4, '0')
        ),
        $3,
        $4,
        'pending'
      )
      RETURNING id
      `,
      [created_by, borrower_id, borrow_date, return_date]
    );

    const transId = transResult.rows[0].id;
    const transCode = transResult.rows[0].transCode;

    for (const item of items) {
      await client.query(
        `
        INSERT INTO transaction_item (
          trans_id,
          item_id,
          qty
        )
        VALUES ($1, $2, $3)
        `,
        [transId, item.item_id, item.qty]
      );
    }

    await client.query("COMMIT");

    return {
      message: "Borrow item success",
      trans_id: transId,
      trans_code: transCode,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};
exports.transactionDetail = async () => {
  const result = await db.query(
    "SELECT * FROM transaction_item ORDER BY id ASC"
  );
  return result.rows;
};
exports.approveTransaction = async (id, authUser) => {
  console.log("\n=== APPROVE TRANSACTION DEBUG ===");
  console.log("Received ID:", id, "Type:", typeof id);
  console.log("Received authUser:", authUser);
  console.log("authUser.id:", authUser?.id, "Type:", typeof authUser?.id);

  const approved_by = authUser.id;
  console.log("approved_by value:", approved_by);

  console.log("\nExecuting query with params:", [approved_by, id]);

  const result = await db.query(
    `UPDATE transactions 
     SET approved_by = $1,
         trans_status = 'approved'
     WHERE id = $2 
     RETURNING *`,
    [approved_by, id]
  );

  console.log("Query executed. Row count:", result.rowCount);
  console.log("Returned data:", result.rows[0]);
  console.log("=================================\n");

  if (result.rowCount === 0) {
    throw new Error("Transaction not found");
  }

  return result.rows[0];
};
