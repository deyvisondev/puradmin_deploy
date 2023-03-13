const express = require("express");
const router = express.Router();
const { addUser, createUser, allUser, getUser, editUser, deleteUser} = require("../controllers/userController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")


router.get("/admin/user-list", redirecLogin, getUserData, allUser)
router.get("/admin/user-create", redirecLogin, getUserData, addUser)
router.post("/admin/user-create", redirecLogin,getUserData, createUser)
router.get("/admin/user-edit/:user_id", redirecLogin, getUserData, getUser)
router.post("/admin/user-edit/:user_id", redirecLogin, getUserData, editUser)
router.post("/admin/user-delete", redirecLogin, getUserData, deleteUser)

module.exports = router;