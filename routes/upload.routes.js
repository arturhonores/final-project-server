const router = require('express').Router()
const { uploadAvatar } = require('../controllers/upload.controllers')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

router.post('/image', uploaderMiddleware.single('imageData'), uploadAvatar)


module.exports = router