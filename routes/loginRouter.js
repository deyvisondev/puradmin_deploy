const express = require("express");
const router = express.Router();
const { login } = require("../controllers/loginController")
const { makeLogin, userLogout } = require("../controllers/adminController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


router.get("/login", redirectHome, login)
router.post("/login", makeLogin)
router.get("/admin/register")


/// LOGOUT ///
router.get("/admin/logout", userLogout)



module.exports = router;