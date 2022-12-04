const express = require("express");
const router = express.Router();
const { allProducts, addProduct, createProduct, getProduct, editProduct, deleteProduct } = require("../controllers/productController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


router.get("/admin/list-product", redirecLogin, allProducts)
router.get("/admin/add-product", redirecLogin, addProduct)
router.post("/admin/add-product", redirecLogin, createProduct)
router.get("/admin/edit-product/:productId", redirecLogin, getProduct)
router.post("/admin/edit-product/:productId", redirecLogin, editProduct)
router.post("/admin/delete-product", redirecLogin, deleteProduct)


module.exports = router;