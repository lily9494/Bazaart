ArtPiece=require('../models/artPiece');
exports.getAddArtPiecePage = (req, res) => {
    res.render("addNewArtPiece");
  };
  exports.saveArtPiece = async (req, res) => {
    let newArtPiece = new ArtPiece({
      title: req.body.title,
      artist: req.body.artist,
      price: req.body.price,
      img: req.body.img,
      seller:req.body.seller
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