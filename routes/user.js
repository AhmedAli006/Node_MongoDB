const router = require("express").Router();
const userController = require('../controllers/userController');
const AuthController = require('../controllers/authController');

router.post("/signup/", userController.user_signup);
router.post("/login/", AuthController.login);
router.get("/", userController.user_all);
router.get("/:userId", userController.user_details);
router.put("/:userId", userController.user_update);
router.delete("/:userId", userController.user_delete);

module.exports = router;