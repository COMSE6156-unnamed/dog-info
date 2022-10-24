const router = require("express").Router();
const dogController = require("../controllers/dogs");

router.get("/", dogController.getAllDogsInfo);
router.get("/:id", dogController.getDog);

module.exports = router