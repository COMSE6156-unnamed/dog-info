const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/", updateController.update_create)

module.exports = router