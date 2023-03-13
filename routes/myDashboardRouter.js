const express = require("express");
const router = express.Router();
const { myLastPickings, createPicagem, getPicagem, editPicagem, deletePicagem } = require("../controllers/myDashboardController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")



router.get("/admin/my-dashboard", redirecLogin, getUserData, myLastPickings)

module.exports = router;