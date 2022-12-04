const express = require('express')
const router = express.Router();
const { dashboard} = require("../controllers/adminController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


router.get("/admin", redirecLogin, dashboard)


module.exports = router;