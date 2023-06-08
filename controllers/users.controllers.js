const User = require('../models/User.model')

const editUser = (req, res, next) => {

    const { id } = req.params
    const { username, avatar, limit } = req.body

    User
        .findByIdAndUpdate(id, { username, avatar, limit }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    editUser
}