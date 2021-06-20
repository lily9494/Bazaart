const router = require("express").Router(),
userRoutes=require("./userRoutes"),
homeRoutes=require("./homeRoutes");
errorRoutes=require("./errorRoutes");
router.use("/users",userRoutes);
router.use("/",homeRoutes);
router.use("/",errorRoutes);
module.exports=router;