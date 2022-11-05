const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/", updateController.create)
router.post("/origin", updateController.create_origin)

module.exports = router