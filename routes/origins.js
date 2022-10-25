const router = require("express").Router();
const originController = require("../controllers/origins");

router.get("/", originController.getOrigins);
router.get("/:id", originController.getOrigin);

module.exports = router