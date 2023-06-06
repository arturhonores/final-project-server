const Expense = require('../models/Expense.model')

const getAllExpenses = (req, res, next) => {

    Expense
        .find()
        .select({ description: 1, amount: 1, owner: 1, date: 1, category: 1 })
        .sort({ amount: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getExpense = (req, res, next) => {

    const { id: expenseId } = req.params

    Expense
        .findById(expenseId)
        .select({ description: 1, amount: 1, owner: 1, date: 1, category: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getCategory = (req, res, next) => {

    const { category } = req.params

    Expense
        .find({ category: category })
        .select({ owner: 1, category: 1, amount: 1, description: 1, date: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteExpense = (req, res, next) => {

    const { id: expenseId } = req.params

    Expense
        .findByIdAndDelete(expenseId)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editExpense = (req, res, next) => {

    const expenseId = req.params.id
    const { description, amount, category, date } = req.body

    Expense
        .findByIdAndUpdate(expenseId, { description, amount, category, date }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const saveExpense = (req, res, next) => {

    const { description, amount, category, date } = req.body
    const { _id: owner } = req.payload

    Expense
        .create({ description, amount, category, date, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    getAllExpenses, getExpense, getCategory, deleteExpense, editExpense, saveExpense
}