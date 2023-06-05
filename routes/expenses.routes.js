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

router.get("/getExpense/:id", (req, res, next) => {
  const expenseId = req.params.id

  Expense
    .findById(expenseId)
    .select({ description: 1, amount: 1, owner: 1, date: 1, category: 1 })
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

router.delete("/deleteExpense/:id", verifyToken, (req, res, next) => {
  const expenseId = req.params.id

  Expense
    .findByIdAndDelete(expenseId)
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put("/editExpense/:id", verifyToken, (req, res, next) => {
  const expenseId = req.params.id
  const { description, amount, category, date } = req.body

  Expense
    .findByIdAndUpdate(expenseId, { description, amount, category, date }, { new: true })
    // El parámetro { new: true } es para que mongoose devuelva el documento actualizado. Por defecto, devuelve el documento original antes de la actualización.
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