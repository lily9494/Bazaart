const User = require("../models/user");
const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();


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
            return res.status(400).json({
                message: "User Not Exist"
            });
        }
        console.log(password, user.password)
        const isMatch = await bcrypt.compare(bcrypt.hash(password), bcrypt.hash(user.password));
        if (!isMatch){
            return res.status(400).json({
                message: "Incorrect Password !"
            });
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
              res.status(200).json({
                token,
                message: "Success!"
              });
            }
        );
    } catch(e){
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
}