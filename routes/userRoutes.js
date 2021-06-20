const router = require("express").Router(),
usersController=require("../controllers/userController");
router.post("/", usersController.saveUser);

router.post("/login",usersController.changePass);
router.get("/users", usersController.getAllUsers);
router.get("/register", usersController.getRegistrationPage);
module.exports=router;