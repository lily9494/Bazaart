exports.sendReqParam = (req, res) => {
    let userHome = req.params.userHome;
    res.render("home", { name: userHome });
    // res.send(`This is the homepage for ${userHome}`);
    
   };
   exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
 res.render("profile", { name: paramsName });
   }
   exports.respondHomePageWebsite = (req, res) => {
    
 res.render("homePageWebsite");
   }
   exports.respondProfile = (req, res) => {
    
    res.render("profile");
      }
   exports.registration = (req, res) => {
    
    res.render("register");
      } 
   exports.respondWithLogin = (req, res) => {
    
    res.render("login");
      } 
      
      exports.respondWithChangePass = (req, res) => {

        res.render("changePass");
          } 