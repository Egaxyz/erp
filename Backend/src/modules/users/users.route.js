const express = require("express");
const router = express.Router();
const controller = require("./users.controller");
const permissionController = require("./permission/permission.controller");
const rolesController = require("./role/role.controller");
const auth = require("../../middleware/auth.middleware");
const permit = require("../../middleware/permission.middleware");

router.get("/", auth, permit("read_users"), controller.getUsers);
router.post("/", auth, permit("create_users"), controller.createUsers);
router.put("/:id", auth, permit("update_users"), controller.updateUsers);
router.delete("/:id", auth, permit("delete_users"), controller.deleteUsers);

router.get(
  "/permissions",
  auth,
  permit("read_perm"),
  permissionController.getPermissions
);
router.post(
  "/permissions",
  auth,
  permit("create_perm"),
  permissionController.createPermissions
);
router.put(
  "/permissions/:id",
  auth,
  permit("update_perm"),
  permissionController.updatePermissions
);
router.delete(
  "/permissions/:id",
  auth,
  permit("delete_perm"),
  permissionController.deletePermissions
);

router.get("/roles", auth, permit("read_roles"), rolesController.getRoles);
router.post(
  "/roles",
  auth,
  permit("create_roles"),
  rolesController.createRoles
);
router.put(
  "/roles/:id",
  auth,
  permit("update_roles"),
  rolesController.updateRoles
);
router.delete(
  "/roles/:id",
  auth,
  permit("delete_roles"),
  rolesController.deleteRoles
);

router.get(
  "/roles-permissions",
  auth,
  permit("read_role_perms"),
  rolesController.getRolesWithPermissions
);
router.post(
  "/roles-permissions",
  auth,
  permit("create_role_perms"),
  rolesController.assignPermissionsToRole
);
router.delete(
  "/roles-permissions/:id",
  auth,
  permit("remove_role_perms"),
  rolesController.removePermissionsFromRoles
);

module.exports = router;
