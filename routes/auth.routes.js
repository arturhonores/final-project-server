const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/User.model')
const { verifyToken } = require("../middlewares/verifyToken.middleware")

router.post('/registro', (req, res, next) => {

    const { email, password, username, avatar } = req.body

    avatar ?
        User
            .create({ email, password, username, avatar })
            .then(() => res.sendStatus(201))
            .catch(err => next(err))
        :
        User
            .create({ email, password, username })
            .then(() => res.sendStatus(201))
            .catch(err => next(err))
})

router.post('/iniciar-sesion', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Ingresa un correo y contraseña" });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "Usuario no encontrado" })
                return;
            }

            if (foundUser.validatePassword(password)) {
                const authToken = foundUser.signToken()
                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Contraseña Incorrecta" });
            }

        })
        .catch(err => next(err));
})

router.get('/verify', verifyToken, (req, res, next) => {

    console.log('EL USUARIO TIENE UN TOKEN CORRECTO Y SUS DATOS SON', req.payload)

    res.status(200).json(req.payload)
})

module.exports = router