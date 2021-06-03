

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bazaart"
const mongoose = require("mongoose");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
});
const User = require("./models/user");
mongoose.Promise =global.Promise;


http = require("http");
express = require("express");
layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/userController");

app = express();
app.use(express.static("public"));
app.use(layouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.get("/profile/:myName", homeController.respondWithName);
app.get("/", homeController.respondHomePageWebsite).listen(port, () => {
  console.log(`The Express.js server has started and is listening
   ➥ on port number: ${port}`);
});
app.get("/login", homeController.respondWithLogin);
//app.get("/register", homeController.registration);
app.get("/home/:userHome", homeController.sendReqParam);
app.get("/changePassword",homeController.respondWithChangePass);
app.get("/users", usersController.getAllUsers);
app.get("/register", usersController.getRegistrationPage);
app.post("/", usersController.saveUser);
app.post("/index",usersController.changePass);
app.get("/index",homeController.respondWithIndex);

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);

  next();
});

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

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
