const router = require("express").Router();
const originController = require("../controllers/origins");
const updateController = require("../controllers/update");

router.get("/", originController.getOrigins);
router.get("/:id", originController.getOrigin);
router.post("/", updateController.create_origin);
router.put("/:id", updateController.update_origin);
router.delete("/:id", updateController.delete_origin);

module.exports = router