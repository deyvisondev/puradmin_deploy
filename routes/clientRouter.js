
const express = require("express")
const router = express.Router()
const { addClient, creatClient, allClient, getClient , editClient, deleteClient} = require("../controllers/clientController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")

router.get("/admin/client-create", redirecLogin, addClient)
router.post("/admin/client-create", redirecLogin, creatClient)
router.get("/admin/client-list", redirecLogin, allClient)
router.get("/admin/client-edit/:client_id", redirecLogin, getClient)
router.post("/admin/client-edit/:client_id", redirecLogin, editClient)
router.post("/admin/client-delete", redirecLogin, deleteClient)

module.exports = router
