const router = require("express").Router()
const Expense = require('../models/Expense.model')
const { verifyToken } = require("../middlewares/verifyToken.middleware")

router.get("/getAllExpenses", (req, res, next) => {
  // TODO: DESCOLPLAR CONTROLADORES CON VIDEO
  Expense
    .find()
    .select({ description: 1, amount: 1, owner: 1, date: 1, category: 1 })
    .sort({ amount: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/getCategory/:category", (req, res, next) => {

  const category = req.params.category

  Expense
    .find({ category: category })
    .select({ owner: 1, category: 1, amount: 1, description: 1, date: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveExpense", verifyToken, (req, res, next) => {

  const { description, amount, category, date } = req.body
  const { _id: owner } = req.payload

  Expense
    .create({ description, amount, category, date, owner })
    .then(response => res.json(response))
    .catch(err => next(err))
})


module.exports = router