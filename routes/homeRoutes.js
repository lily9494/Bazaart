
const router = require("express").Router(),
homeController=require("../controllers/homeController");
router.get("/profile/:myName", homeController.respondWithName);
router.get("/", homeController.respondHomePageWebsite);
router.get("/login", homeController.respondWithLogin);
router.get("/home/:userHome", homeController.sendReqParam);
router.get("/changePassword",homeController.respondWithChangePass);
module.exports=router;