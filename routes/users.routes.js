const router = require("express").Router()
const User = require('../models/User.model')
// const { verifyToken } = require("../middlewares/verifyToken.middleware")


// router.delete("/deleteUser/:id", verifyToken, (req, res, next) => {
//     const expenseId = req.params.id

//     Expense
//         .findByIdAndDelete(expenseId)
//         .then(response => res.json(response))
//         .catch(err => next(err))
// })

router.put("/:id/edit", (req, res, next) => {
    const { id } = req.params
    const { username, avatar } = req.body

    User
        .findByIdAndUpdate(id, { username, avatar }, { new: true })
        // El parámetro { new: true } es para que mongoose devuelva el documento actualizado. Por defecto, devuelve el documento original antes de la actualización.
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router