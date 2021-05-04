exports.sendPainters = (req, res) => {
let painter = req.params.painters;
res.send(`This is the page for ${painter}`);
};

exports.sendSculpters = (req, res) => {
  let sculpter = req.params.sculpters;
  res.send(`This is the page for ${sculpters}`);
};

exports.sendHome = (req, res) => {
  let home = req.params.home;
  res.send(' Hello Fellow Art Connoiseur' );
};

exports.sendArtist = (req, res) => {
  let artist = req.param.artists;
  res.send('This is the page for ${artist}');
};
