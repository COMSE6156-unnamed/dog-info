const router = require("express").Router();
const categoryController = require("../controllers/categories");
const updateController = require("../controllers/update");

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", updateController.create_category);
router.put("/:id", updateController.update_category);
router.delete("/:id", updateController.delete_category);

module.exports = router