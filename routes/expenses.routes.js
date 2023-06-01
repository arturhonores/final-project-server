const router = require("express").Router()
const Expense = require('../models/Expense.model')
const { verifyToken } = require("../middlewares/verifyToken.middleware")

router.get("/getAllExpenses", (req, res, next) => {

  Expense
    .find()
    .select({ description: 1, amount: 1, owner: 1 })
    .sort({ amount: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/getOneExpense/:expense_id", (req, res, next) => {

  const { expense_id } = req.params

  Expense
    .findById(expense_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveExpense", verifyToken, (req, res, next) => {

  const { description, amount } = req.body
  const { _id: owner } = req.payload

  Expense
    .create({ description, amount, owner })
    .then(response => res.json(response))
    .catch(err => next(err))
})


module.exports = router