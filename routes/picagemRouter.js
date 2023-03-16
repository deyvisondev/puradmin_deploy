const express = require("express");
const router = express.Router();
const { addPicagem, createPicagem, getPicagem, editPicagem, deletePicagem, getPicker, PickerPerformance } = require("../controllers/picagemController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")
const { administrador, pickingDashboardAutorization } = require("../middleware/unauthorizedMiddleware")



router.get("/admin/add-picagem", redirecLogin, getUserData, addPicagem)
router.post("/admin/add-picagem", redirecLogin, getUserData, createPicagem)
router.get("/admin/edit-picagem/:picagemId", redirecLogin, getUserData, getPicagem )
router.post("/admin/edit-picagem/:picagemId", redirecLogin, getUserData, editPicagem)
router.post("/admin/delete-picagem", redirecLogin, getUserData, deletePicagem)
router.get("/admin/get-picker", redirecLogin, getUserData, pickingDashboardAutorization, getPicker )
router.get("/admin/picker-dashboard", redirecLogin, getUserData, pickingDashboardAutorization ,PickerPerformance )


module.exports = router;