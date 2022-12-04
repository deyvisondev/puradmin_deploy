const express = require("express");
const router = express.Router();
const {  addSection, allSection, createSection, getSection, editSection, deleteSection } = require("../controllers/sectionController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


router.get("/admin/section-list", redirecLogin, allSection)
router.get("/admin/section-create", redirecLogin, addSection)
router.post("/admin/section-create", redirecLogin, createSection)
router.get("/admin/section-edit/:section_id", redirecLogin, getSection)
router.post("/admin/section-edit/:section_id", redirecLogin, editSection)
router.post("/admin/section-delete", redirecLogin, deleteSection)

module.exports = router;