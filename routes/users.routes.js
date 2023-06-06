const router = require("express").Router()
const User = require('../models/User.model')
// const { verifyToken } = require("../middlewares/verifyToken.middleware")
const { editUser } = require("../controllers/users.controllers")

router.put("/:id/edit", editUser)

module.exports = router