const router = require("express").Router();
const sizeController = require("../controllers/sizes");

router.get("/", sizeController.getSizes);
router.get("/:id", sizeController.getSize);

module.exports = router