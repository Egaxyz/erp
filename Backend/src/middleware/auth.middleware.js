const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("=== AUTH MIDDLEWARE ===");
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid auth format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("✅ User authenticated:", req.user);
    next();
  } catch (error) {
    console.error("❌ JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
