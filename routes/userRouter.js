const express = require("express");
const router = express.Router();
const { addUser, createUser, allUser, getUser, editUser, deleteUser} = require("../controllers/userController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


router.get("/admin/user-list", redirecLogin, allUser)
router.get("/admin/user-create", redirecLogin, addUser)
router.post("/admin/user-create", redirecLogin, createUser)
router.get("/admin/user-edit/:user_id", redirecLogin, getUser)
router.post("/admin/user-edit/:user_id", redirecLogin, editUser)
router.post("/admin/user-delete", redirecLogin, deleteUser)

module.exports = router;