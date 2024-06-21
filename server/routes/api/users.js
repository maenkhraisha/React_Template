const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

const userController = require("../../controllers/usersControllers");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUsers)
  .put(verifyRoles(ROLES_LIST.Admin), userController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

router.route("/:id").get(userController.getUser);

module.exports = router;
