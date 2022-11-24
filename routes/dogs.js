const router = require("express").Router();
const dogController = require("../controllers/dogs");
const updateController = require("../controllers/update");

router.get("/", dogController.getDogsInfo);
router.get("/all", dogController.getAllDogsInfo);
router.get("/:id", dogController.getDog);
router.get("/:id/categories", dogController.getDogCategories);
router.get("/:id/origins", dogController.getDogOrigins);
router.get("/:id/size", dogController.getDogSize);
router.get("/:id/image_url", dogController.getDogImageUrl);
router.get("/:id/pronunciation_url", dogController.getDogPronunciationUrl);
router.post("/", updateController.create_dog);
router.put("/:id", updateController.update_dog);
router.delete("/:id", updateController.delete_dog);

module.exports = router