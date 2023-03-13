const { getRounds } = require('bcrypt');
const express = require('express')
const router = express.Router();
const { dashboard} = require("../controllers/adminController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")


router.get("/admin", redirecLogin, getUserData, dashboard)


module.exports = router;