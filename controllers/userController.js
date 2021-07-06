const User = require("../models/user"),
ArtPiece=require('../models/artPiece');
const bcrypt=require('bcrypt');
const _=require('lodash'),
jwt=require("jsonwebtoken")

exports.getRegistrationPage = (req, res) => {
  res.render("../views/register.ejs");
};

exports.index = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      if (req.query.format === "json"){
        res.json({ users });}
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
exports.redirectView= (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath) res.redirect(redirectPath);
  else next();
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
exports.validate=(req, res, next) => {
  req.sanitizeBody("email").normalizeEmail({
  all_lowercase: true
  }).trim();
  req.check("email", "Email is invalid").isEmail();
 
  req.check("password", "Password cannot be empty").notEmpty();
  req.getValidationResult().then((error) => {
  if (!error.isEmpty()) {
 let messages = error.array().map(e => e.msg);
 req.skip = true; 
 res.render("register",{ flashMessages: {
  error:  messages.join(" and ")
  }})

 next();
  } else {
 next();
  }
  });
 }
exports.loginUser =async (req, res)=>{
     
  //validate

  //exist
  let user=await User.findOne({email:req.body.email});
  if(!user) return res.send('Invalid Email');
 const passValid= await bcrypt.compare(req.body.password , user.password);
 if(!passValid) return res.send('Invalid Password');
 const token=jwt.sign({_id:user._id},"privateKey");
 res.header('x-authToken',token).render("changePass");
//  res.render(`home`);
}