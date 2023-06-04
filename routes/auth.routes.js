const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/User.model')
const { verifyToken } = require("../middlewares/verifyToken.middleware")
const saltRounds = 10

router.post('/registro', (req, res, next) => {

    const { email, password, username, avatar } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 2 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            //solución a avatar por defecto:
            if (avatar) {
                return User.create({ email, password: hashedPassword, username, avatar })
            } else {
                return User.create({ email, password: hashedPassword, username })
            }

            // return User.create({ email, password: hashedPassword, username, avatar })
        })
        .then((createdUser) => {

            const { email, username, _id } = createdUser
            const user = { email, username, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            next(err)
        })
})

router.post('/iniciar-sesion', (req, res, next) => {

    // console.log('secretoo', process.env.TOKEN_SECRET)

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, avatar } = foundUser;

                const payload = { _id, email, username, avatar }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.json({ authToken: authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }

        })
        .catch(err => next(err));
})


//actualizar datos del usuario
router.put('/actualizar', verifyToken, (req, res, next) => {

    console.log('Datos del usuario para actualizar: ', req.body)

    // Extraer los campos que se pueden actualizar
    const { username, password, avatar } = req.body;

    // Crear un objeto para almacenar los nuevos datos del usuario
    const updatedUser = {}

    if (username) updatedUser.username = username;
    if (avatar) updatedUser.avatar = avatar;

    // Si se proporcionó una nueva contraseña, debes cifrarla antes de guardarla
    if (password) {
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)
        updatedUser.password = hashedPassword;
    }

    User
        .findByIdAndUpdate(req.payload._id, updatedUser, { new: true })
        .then((updatedUser) => {

            const { _id, email, username, avatar } = updatedUser;

            const payload = { _id, email, username, avatar }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )

            res.status(200).json({ authToken: authToken });
        })
        .catch(err => {
            next(err)
        })
})
//


router.get('/verify', verifyToken, (req, res, next) => {

    console.log('EL USUARIO TIENE UN TOKEN CORRECTO Y SUS DATOS SON', req.payload)

    res.status(200).json(req.payload)
})

module.exports = router