

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bazaart";
const mongoose = require("mongoose"),
methodOverride=require("method-override");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
});
const User = require("./models/user");
mongoose.Promise =global.Promise;

const http = require("http"),
express = require("express"),
router = express.Router();

layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/userController");
const addNewArtPiece = require("./controllers/artPieceController");

app = express();
 app.set("view engine", "ejs");
 app.get("/", homeController.respondHomePageWebsite).listen(port, () => {
  console.log(`The Express.js server has started and is listening
   ➥ on port number: ${port}`);
});
app.use("/", router);
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
 }));
router.use(express.static("public"));
router.use(layouts);

router.use(express.static("public"));
router.use(express.json());
router.use(
  express.urlencoded({
    extended: false,
  })
);
router.get("/profile/:myName", homeController.respondWithName);

router.get("/login", homeController.respondWithLogin);
//router.get("/register", homeController.registration);
router.get("/home/:userHome", homeController.sendReqParam);
router.get("/changePassword",homeController.respondWithChangePass);
router.get("/users", usersController.index);
router.get("/users/:id", usersController.showUsersArtsPage);
router.get("/register", usersController.getRegistrationPage);
router.get("/addNewArtPiece",addNewArtPiece.getAddArtPiecePage);
router.post("/", usersController.saveUser);
router.post("/home",usersController.loginUser);
router.put("/changePassword",usersController.changePass);
router.post("/addNewArtPiece",addNewArtPiece.saveArtPiece);
router.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);

  next();
});

router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

// httpStatus=require("http-status-codes"),
// contentTypes=require("./contentTypes"),
// utiles=require("./utiles.js"),
// router=require("./router");

// router.get("/",(req,res)=>{
// res.writeHead(httpStatus.OK,contentTypes.html);
// utiles.getFile("views/login.html",res);
// });

// router.get("/home",(req,res)=>{
//     res.writeHead(httpStatus.OK,contentTypes.html);
//     utiles.getFile("views/home.html",res);
//     });

// http.createServer(router.handle).listen(port);
// console.log("works")
