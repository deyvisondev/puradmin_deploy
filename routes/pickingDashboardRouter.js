const express = require('express')
const router = express.Router();
const { dashboard} = require("../controllers/pickingDashboardController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


router.get("/admin/dashboard-picking", redirecLogin, dashboard)


module.exports = router;