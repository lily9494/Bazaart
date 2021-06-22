const User = require("../models/user");
const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const homeView = require("../controllers/homeController")


exports.login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
    }

    const { username , password } = req.body;

    try{
        const user = await User.findOne({
            username: username
        }).exec();

        if (!user){
            console.log("User does not exist.")
            res.status(401).render("login", {"error": "Wrong credentials, please try again."});
        }

        
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            console.log("Authentication failed. Password doesn't match");
            res.status(401).render("login", {"error": "Wrong credentials, please try again."});
        }

        const payload = {
            user: {
              id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString",
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
            res.cookie('token', token).status(200).redirect("/")
            next()
            }
        );

    } catch(e){
        console.error(e);
        res.status(500).json({
            message: "Something went wrong. Please try Again."
        });
    }
}