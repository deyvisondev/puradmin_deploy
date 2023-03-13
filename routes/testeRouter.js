const express = require("express");
const router = express.Router();
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getDailyBilling, getPage } = require("../controllers/testeController")
const { getUserData } = require("../middleware/userDataMiddleware")


router.get("/admin/teste-req", redirecLogin, getUserData, getPage)
router.get("/admin/teste-res", redirecLogin, getUserData, getDailyBilling)


module.exports = router;