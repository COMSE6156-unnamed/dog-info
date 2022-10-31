const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/", updateController.update)

module.exports = router