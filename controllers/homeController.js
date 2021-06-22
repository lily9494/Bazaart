const User = require("../models/user");

exports.sendReqParam = async (req, res) => {
  // const user = await User.findById(req.user.username);
  // console.log(user)
  res.render("home", { name: "test User not actually logged in" });
};

exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
    res.render("profile", { name: paramsName });
}

exports.respondHomePageWebsite = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    console.log(user)
    res.render("homePageWebsite", {"user": user.username});
  } catch (e) {
    res.render("homePageWebsite");
  }
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