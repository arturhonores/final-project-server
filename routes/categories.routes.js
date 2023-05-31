const router = require("express").Router()

const Category = require('../models/Category.model')

router.get("/getAllCoasters", (req, res, next) => {

  Coaster
    .find()
    .select({ title: 1, imageUrl: 1 })
    .sort({ title: 1 })
    .then(response => setTimeout(() => res.json(response), 1000))
    .catch(err => next(err))
})


router.get("/getOneCoaster/:coaster_id", (req, res, next) => {

  const { coaster_id } = req.params

  Coaster
    .findById(coaster_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveCoaster", (req, res, next) => {

  const { title, description, length, inversions, imageUrl } = req.body

  Coaster
    .create({ title, description, length, inversions, imageUrl })
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router
