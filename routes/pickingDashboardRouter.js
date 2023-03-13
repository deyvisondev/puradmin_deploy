const express = require('express')
const router = express.Router();
const { dashboard} = require("../controllers/pickingDashboardController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")



router.get("/admin/dashboard-picking", redirecLogin, getUserData, dashboard)


module.exports = router;