const jwt=require("jsonwebtoken")
module.exports=function(req,res,next){
const token=req.header('x-authToken');
        if(!token) return res.status(401).send("access denied");
        try {
          const decoded=jtw.verify(token,"privateKey");
          req.user=decoded;
          next()
        } catch (error) {
          res.status(400).send('Invalid token')
        }
    }