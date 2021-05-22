exports.sendReqParam = (req, res) => {
    let userHome = req.params.userHome;
    res.render("home", { name: userHome });
    // res.send(`This is the homepage for ${userHome}`);
    
   };
   exports.respondWithName = (req, res) => {
    let paramsName = req.params.userName;
 res.render("profile", { name: paramsName });
   };
   exports.respondHomePageWebsite = (req, res) => {
    
 res.render("homePageWebsite");
   };
   exports.respondWithLogin = (req, res) => {
    
    res.render("login");
      } 