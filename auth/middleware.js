const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    var token;
    if(req.headers['cookie']){
        const authHeader = req.headers['cookie'].split(/=| /);
        const index = authHeader.findIndex(el => el == "token")
        token = authHeader[index + 1]
        const lastChar = token.charAt(token.length - 1);
        if(lastChar == ";" && authHeader.length > 2){
            token = token.substring(0, token.length - 1);
        }
    }
    else{
        console.log("no cookie")
        return
    }

    if (!token) return res.status(401).json({ message: "Auth Error" });

    try {
        //console.log(token)
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).render("homePageWebsite");
    }
};