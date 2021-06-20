
const errorController = require("../controllers/errorController");
const router = require("express").Router();
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);
module.exports=router;