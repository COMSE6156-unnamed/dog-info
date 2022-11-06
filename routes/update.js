const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/dog", updateController.update_dog)
router.post("/origin", updateController.update_origin)
router.post("/category", updateController.update_category)

module.exports = router