const express = require("express");
const router = express.Router();
const { allProducts, addProduct, createProduct, getProduct, editProduct, deleteProduct } = require("../controllers/productController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")


router.get("/admin/list-product", redirecLogin, getUserData, allProducts)
router.get("/admin/add-product", redirecLogin, getUserData, addProduct)
router.post("/admin/add-product", redirecLogin, getUserData, createProduct)
router.get("/admin/edit-product/:productId", redirecLogin, getUserData, getProduct)
router.post("/admin/edit-product/:productId", redirecLogin, getUserData, editProduct)
router.post("/admin/delete-product", redirecLogin, getUserData, deleteProduct)


module.exports = router;