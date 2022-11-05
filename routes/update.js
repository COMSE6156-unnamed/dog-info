const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/", updateController.update)
router.post("/origin", updateController.update_origin)

module.exports = router