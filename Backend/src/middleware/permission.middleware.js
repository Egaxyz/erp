const db = require("../config/db");

module.exports = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      console.log("Checking permission for user:", userId);
      console.log("Required permission:", requiredPermission);

      const { rows } = await db.query(
        `
        SELECT p.perm_name, r.role_name
        FROM users u
        JOIN role r ON u.role_id = r.id
        JOIN role_permission rp ON r.id = rp.role_id
        JOIN permission p ON rp.perm_id = p.id
        WHERE u.id = $1
          AND p.perm_name = $2
        `,
        [userId, requiredPermission]
      );

      console.log("Permission check result:", rows);

      if (rows.length === 0) {
        return res.status(403).json({
          message:
            "Forbidden: You don't have permission to perform this action",
          required: requiredPermission,
        });
      }

      console.log(`✓ User has ${requiredPermission} permission`);
      next();
    } catch (error) {
      console.error("Permission check error:", error);
      return res.status(500).json({
        message: "Error checking permissions",
        error: error.message,
      });
    }
  };
};
