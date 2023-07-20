const router = require("express").Router();
const userController = require('../controllers/userController');

router.post("/signup/", userController.user_signup);
router.get("/", userController.user_all);
router.get("/login/:userId", userController.user_login);
router.put("/:userId", userController.user_update);
router.delete("/:userId", userController.user_delete);

module.exports = router;