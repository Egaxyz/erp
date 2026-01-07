const db = require("../../config/db");

exports.getTransaction = async () => {
  const result = await db.query("SELECT * FROM transaction ORDER BY id ASC");
  return result.rows;
};
exports.borrowItem = async (data) => {
  const { created_by, borrower_id, borrow_date, return_date, items } = data;

  if (
    !created_by ||
    !borrower_id ||
    !borrow_date ||
    !return_date ||
    !items ||
    !items.length
  ) {
    throw new Error("Fields are required");
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Insert ke transaction (header)
    const transResult = await client.query(
      `
      INSERT INTO transaction (
        borrower_id,
        created_by,
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
          EXTRACT(YEAR FROM NOW()),
          EXTRACT(MONTH FROM NOW()),
          LPAD(nextval('trans_code')::text, 4, '0')
        ),
        $3,
        $4,
        'pending'
      )
      RETURNING id
      `,
      [borrower_id, created_by, borrow_date, return_date]
    );

    const transId = transResult.rows[0].id;

    // 2️⃣ Insert ke transaction_item (detail)
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
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
