const mongoose = require("mongoose"),
User=require("../models/user")
  artPieceSchema = mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String },
    seller:{type: String},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });
  artPieceSchema.pre("save", function (next) {
    let artPiece = this;
    if (artPiece.userId === undefined) {
    User.findOne({
   username: artPiece.seller
    })
   .then(user => {
    artPiece.userId = user;
    next();
    })
    .catch(error => {
    console.log(`Error in connecting user:
    ➥ ${error.message}`);
    next(error);
    });
     } else {
    next();
     }
    })
    artPieceSchema.methods.getInfo = function() {
        return `title: ${this.title} seller: ${this.seller}`
       };
module.exports = mongoose.model("artPiece", artPieceSchema);