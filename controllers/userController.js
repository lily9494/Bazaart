const User = require("../models/user"),
ArtPiece=require('../models/artPiece');
const bcrypt=require('bcrypt');
const _=require('lodash');

exports.getRegistrationPage = (req, res) => {
  res.render("../views/register.ejs");
};

exports.index = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      res.render("index", { users: users });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};
exports.showUsersArtsPage = (req, res) => {
  let userId = req.params.id;
 ArtPiece.find({userId:userId})
    .exec()
    .then((artPieces) => {
      res.render("showUsersArts", { artPieces: artPieces });
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
  let user=await User.findOne({email:req.body.email});
  if(user) return res.send('user already registered');

  let username=await User.findOne({email:req.body.username});
  if(username) return res.send('username already exist');

  let newUser = new User(_.pick(req.body,['firstName',
    'lastName',
    'email',
    'username',
    'password']))
 newUser.password=hashedPass;
  try {
   
    result=await newUser.save();

    res.render("register" ,{ flashMessages: {
      success: "account registered successfully"
      }}); 
       req.flash("success", `${newUser.email}'s account created successfully!`)
  } catch (error) {
    res.render("register",{ flashMessages: {
      error: `failed to create account ${error.message}`
      }});
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


exports.changePass =async (req, res)=>{
     
  const salt= await bcrypt.genSalt(10);
  const hashedPass=await bcrypt.hash(req.body.newPassword,salt);
  
   const user=await User.findOne({email:req.body.email});
   if(!user) return res.send('Invalid Email');
  const passValid= await bcrypt.compare(req.body.password , user.password);
  if(!passValid) return res.send('Invalid Password');

User.update({email:req.body.email},{
  $set:{
    password:hashedPass
  }
}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
   
  });

  res.render("login");
}

exports.loginUser =async (req, res)=>{
     
  //validate

  //exist
  let user=await User.findOne({email:req.body.email});
  if(!user) return res.send('Invalid Email');
 const passValid= await bcrypt.compare(req.body.password , user.password);
 if(!passValid) return res.send('Invalid Password');
 res.render("home");
}