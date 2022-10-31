const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/", updateController.create)

module.exports = router