const express = require("express");
const router = express.Router();
const { addDailyBilling, createDailyBilling, getDailyBilling, editDailyBilling  } = require("../controllers/dailyBillingController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")

const { administrador } = require("../middleware/unauthorizedMiddleware")


// Events
router.get("/admin/add-daily-billing", redirecLogin, getUserData, administrador, addDailyBilling)
router.post("/admin/add-daily-billing", redirecLogin, getUserData, createDailyBilling)
router.get("/admin/edit-daily-billing/:daily_billing_id", redirecLogin, getUserData, getDailyBilling)
router.post("/admin/edit-daily-billing/:daily_billing_id", redirecLogin, getUserData, editDailyBilling)

module.exports = router;