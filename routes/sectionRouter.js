const express = require("express");
const router = express.Router();
const {  addSection, allSection, createSection, getSection, editSection, deleteSection } = require("../controllers/sectionController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")


router.get("/admin/section-list", redirecLogin, getUserData, allSection)
router.get("/admin/section-create", redirecLogin, getUserData, addSection)
router.post("/admin/section-create", redirecLogin, getUserData, createSection)
router.get("/admin/section-edit/:section_id", redirecLogin, getUserData, getSection)
router.post("/admin/section-edit/:section_id", redirecLogin,getUserData,  editSection)
router.post("/admin/section-delete", redirecLogin, getUserData, deleteSection)

module.exports = router;