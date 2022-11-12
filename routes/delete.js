const router = require("express").Router();
const updateController = require("../controllers/update")

router.post("/dog", updateController.delete_dog)
router.post("/origin", updateController.delete_origin)
router.post("/category", updateController.delete_category)
router.post("/size", updateController.delete_size)

module.exports = router