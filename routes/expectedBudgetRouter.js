const express = require("express");
const router = express.Router();
const { addExpectedBudget, createExpectedBudget, getExpectedBudget, editExpectedBudget} = require("../controllers/expectedBudgetController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData,  } = require("../middleware/userDataMiddleware")



router.get("/admin/add-expected-budget", redirecLogin, getUserData, addExpectedBudget)
router.post("/admin/add-expected-budget", redirecLogin, getUserData, createExpectedBudget)
router.get("/admin/edit-expected-budget/:budget_expectedsId", redirecLogin, getUserData,  getExpectedBudget)
router.post("/admin/edit-expected-budget/:budget_expectedsId", redirecLogin, getUserData, editExpectedBudget)
router.post("/admin/delete-picagem", redirecLogin, getUserData, )


module.exports = router;