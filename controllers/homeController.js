exports.sendReqParam = (req, res) => {
    let userHome = req.params.userHome;
    res.render("home", { name: userHome });
    // res.send(`This is the homepage for ${userHome}`);
    
   };
   exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
 res.render("profile", { name: paramsName });
   }