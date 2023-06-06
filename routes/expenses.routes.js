const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken.middleware")
const { deleteExpense, editExpense, getAllExpenses, getCategory, getExpense, saveExpense } = require("../controllers/expenses.controllers")

router.get("/getAllExpenses", getAllExpenses)

router.get("/getExpense/:id", getExpense)

router.get("/getCategory/:category", getCategory)

router.delete("/deleteExpense/:id", verifyToken, deleteExpense)

router.put("/editExpense/:id", verifyToken, editExpense)

router.post("/saveExpense", verifyToken, saveExpense)


module.exports = router