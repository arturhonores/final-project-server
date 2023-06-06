const User = require('../models/User.model')

const editUser = (req, res, next) => {
    const { id } = req.params
    const { username, avatar } = req.body

    User
        .findByIdAndUpdate(id, { username, avatar }, { new: true })
        // El parámetro { new: true } es para que mongoose devuelva el documento actualizado. Por defecto, devuelve el documento original antes de la actualización.
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    editUser
}