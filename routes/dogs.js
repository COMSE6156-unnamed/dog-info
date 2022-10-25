const router = require("express").Router();
const dogController = require("../controllers/dogs");

router.get("/", dogController.getAllDogsInfo);
router.get("/:id", dogController.getDog);
router.get("/:id/categories", dogController.getDogCategories);
router.get("/:id/origins", dogController.getDogOrigins);
router.get("/:id/size", dogController.getDogSize);
module.exports = router