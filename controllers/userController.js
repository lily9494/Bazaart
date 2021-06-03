const User = require("../models/user");
const bcrypt=require('bcrypt');
const _=require('lodash');

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