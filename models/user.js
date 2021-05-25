const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
    firstName: {type:String, required:true},
    lastName:  {type:String, required:true},
    email: { type: String,required: true,lowercase: true,
      unique: true},
    username: { type: String,required: true,unique: true},
    password:{ type:String ,required: true}
  });

  userSchema.methods.getInfo = function() {
    return `username: ${this.username} email: ${this.email}`
   };
module.exports = mongoose.model("User", userSchema);
