const express = require('express')
const router = express.Router();
const { dashboard, getDate, getDailyBilling } = require("../controllers/dailyBillingDashboardController")
const { teste } = require("../controllers/dashboardBillingDateController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")



router.get("/admin/daily-billing-dashboard", redirecLogin, getUserData, dashboard )
router.get("/admin/date-daily-dashboard", redirecLogin, getUserData, getDate)
router.get("/admin/date-daily-dashboard/", redirecLogin, getUserData, getDailyBilling)
router.get("/admin/dashboard-billing-date/", redirecLogin, getUserData, teste)


module.exports = router;