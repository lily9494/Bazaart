

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bazaart"
const mongoose = require("mongoose");
const User = require("./models/user");
const bodyParser = require("body-parser");

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
}, (err, client) => {
  if (err) return console.log(err)

  // Storing a reference to the database so you can use it later
  console.log(`Connected MongoDB: ${uri}`)
});

mongoose.Promise =global.Promise;


http = require("http");
express = require("express");
layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/userController");
const authentication = require("./controllers/authentication");

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
app.get("/", homeController.respondHomePageWebsite);
app.get("/login", homeController.respondWithLogin);
app.post("/login", authentication.login);
//app.get("/register", homeController.registration);
app.get("/home/:userHome", homeController.sendReqParam).listen(port, () => {
  console.log(`The Express.js server has started and is listening
   ➥ on port number: ${port}`);
});

app.get("/users", usersController.getAllUsers);
app.get("/register", usersController.getRegistrationPage);
app.post("/", usersController.saveUser);

app.use(bodyParser.json());


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
