const mongoose = require("mongoose"),
  artPieceSchema = mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });

module.exports = mongoose.model("artPiece", artPieceSchema);
