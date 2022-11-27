const router = require("express").Router();
const sizeController = require("../controllers/sizes");
const updateController = require("../controllers/update");

router.get("/", sizeController.getSizes);
router.get("/:id", sizeController.getSize);
router.post("/", updateController.create_size);
router.put("/:id", updateController.update_size);
router.delete("/:id", updateController.delete_size);

module.exports = router