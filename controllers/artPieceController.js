const ArtPiece = require("../models/artPiece");
exports.getAddNewArtPiecePage = (req, res) => {
  res.render("../views/addNewArtPiece.ejs");
};

exports.getAllArtPieces = (req, res) => {
  ArtPiece.find({})
    .exec()
    .then((artPieces) => {
      res.render("artPieces", { artPieces: artPieces });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.saveArtPiece = async (req, res) => {
  let newArtPiece = new ArtPiece({
    title: req.body.title,
    artist: req.body.artist,
    price: req.body.price,
    img: req.body.img,
  });
  newArtPiece
    .save()
    .then(() => {
      res.render("homePageWebsite");
    })
    .catch((error) => {
      res.send(error);
      console.log(error.message);
    });
};
