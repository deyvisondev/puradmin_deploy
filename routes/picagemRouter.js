const express = require("express");
const router = express.Router();
const { addPicagem, createPicagem, getPicagem, editPicagem, deletePicagem } = require("../controllers/picagemController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


router.get("/admin/add-picagem", redirecLogin, addPicagem)
router.post("/admin/add-picagem", redirecLogin, createPicagem)
router.get("/admin/edit-picagem/:picagemId", redirecLogin, getPicagem )
router.post("/admin/edit-picagem/:picagemId", redirecLogin, editPicagem)
router.post("/admin/delete-picagem", redirecLogin, deletePicagem)


module.exports = router;