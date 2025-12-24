const express = require("express");
const router = express.Router();
const controller = require("./users.controller");
const permissionController = require("./permission/permission.controller");
const rolesController = require("./role/role.controller");
const auth = require("../../middleware/auth.middleware");
const permit = require("../../middleware/permission.middleware");

router.post("/", auth, permit("make_users"), controller.createUsers);
router.get("/", controller.getUsers);
router.put("/:id", controller.updateUsers);
router.delete("/:id", controller.deleteUsers);

router.get("/permissions", permissionController.getPermissions);
router.post("/permissions", permissionController.createPermissions);
router.put("/permissions/:id", permissionController.updatePermissions);
router.delete("/permissions/:id", permissionController.deletePermissions);

router.get("/roles", rolesController.getRoles);
router.post("/roles", rolesController.createRoles);
router.put("/roles/:id", rolesController.updateRoles);
router.delete("/roles/:id", rolesController.deleteRoles);

router.get("/roles-permissions", rolesController.getRolesWithPermissions);
router.post("/roles-permissions", rolesController.assignPermissionsToRole);
router.delete(
  "/roles-permissions/:id",
  rolesController.removePermissionsFromRoles
);

module.exports = router;
