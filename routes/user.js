const router = require("express").Router();
const userController = require('../controllers/userController');

router.post("/", userController.user_create);
router.get("/", userController.user_all);
router.get("/:userId", userController.user_details);
router.put("/:userId", userController.user_update);
router.delete("/:userId", userController.user_delete);

module.exports = router;