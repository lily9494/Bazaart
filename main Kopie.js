
 const port = 3000,
const
express = require('express'),
app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController");


// app.get("/artists/:painters", (req, res) => {
// let painter = req.params.painters;
// res.send('This is the page for ${painter}');
// });
app.set("port", process.env.PORT || 3000);
app.get("view engine");
app.get("/artists", homeController.sendArtist);
app.get("/artists/:painters", homeController.sendPainters);
app.get("/artists/:sculpters", homeController.sendSculpters);
app.get("/", homeController.sendHome);

app.use((req, res, next) => {
  console.log('request made to: ${req.url}');
  console.log(req.query);
  next();
});
app.use(
  express.urlencoded({
    extended: false
  }));

 app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful");
});

app.listen("port", () => {
console.log('Server running at http://localhost:$ { app.get("port") } ');
});
