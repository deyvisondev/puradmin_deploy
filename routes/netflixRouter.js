const express = require("express");
const router = express.Router();
const { netflix } = require("../controllers/netflixController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")


router.get("/admin/netflix", redirecLogin, getUserData, netflix)



module.exports = router;