const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/dog", updateController.create_dog)
router.post("/origin", updateController.create_origin)
router.post("/category", updateController.create_category)

module.exports = router