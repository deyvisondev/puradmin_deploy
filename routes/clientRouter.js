
const express = require("express")
const router = express.Router()
const { addClient, creatClient, allClient, getClient , editClient, deleteClient} = require("../controllers/clientController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")

router.get("/admin/client-create", redirecLogin, getUserData, addClient)
router.post("/admin/client-create", redirecLogin, getUserData, creatClient)
router.get("/admin/client-list", redirecLogin, getUserData, allClient)
router.get("/admin/client-edit/:client_id", redirecLogin, getUserData, getClient)
router.post("/admin/client-edit/:client_id", redirecLogin, getUserData, editClient)
router.post("/admin/client-delete", redirecLogin, getUserData, deleteClient)

module.exports = router
