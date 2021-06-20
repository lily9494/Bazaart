const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bazaart";
const mongoose = require("mongoose");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const User = require("./models/user");
mongoose.Promise = global.Promise;

http = require("http");
const express = require("express"),
layouts = require("express-ejs-layouts"),
router=require("./routes/index");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/userController");
const artPieceController = require("./controllers/artPieceController");

app = express();
app.use(express.static("public"));
app.use(layouts);
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.listen(port);
app.use("/",router)


app.get("/artPieces", artPieceController.getAllArtPieces);
app.get("/addNewArtPiece", artPieceController.getAddNewArtPiecePage);
app.post("/", artPieceController.saveArtPiece);


app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);

  next();
});


