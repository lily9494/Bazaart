const User = require("../models/user");
const bcrypt=require('bcrypt')
exports.getRegistrationPage = (req, res) => {
  res.render("../views/register.ejs");
};

exports.getAllUsers = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      res.render("users", { users: users });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.saveUser =async (req, res) => {
  const salt= await bcrypt.genSalt(10);
  const hashedPass=await bcrypt.hash(req.body.password,salt);
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: hashedPass,
  });
  try {
    result=await newUser.save();
    res.render("activationAcc");
  } catch (error) {
    res.send("something went wrong,please try again and check your entries");
    console.log(error.message);
  }
  // newUser
  //   .save()
  //   .then(() => {
  //     res.render("activationAcc");
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //     console.log(error.message);
  //   });
};
