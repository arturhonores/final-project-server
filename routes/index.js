const router = require("express").Router();

router.use("/expenses", require("./expenses.routes"))
router.use("/categories", require("./categories.routes"))
router.use("/auth", require('./auth.routes'))
router.use("/upload", require('./upload.routes'))

module.exports = router