const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (email, password) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  if (!user) {
    throw new Error("User not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    { id: user.id, role_id: user.role_id },
    process.env.JWT_SECRET
  );

  return { token };
};

exports.register = async (userData) => {
  const { email, password, name } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name",
    [email, hashedPassword, name]
  );
  return result.rows[0];
};
