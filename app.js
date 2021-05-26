
const User = require("./models/user");
mongoose.Promise =global.Promise;


http = require("http");
express = require("express");
layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/userController");
const port = process.env.PORT || ((process.env.NODE.ENV === 'test') ? 30020: 3002)
app.set('port', port)

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
//app.get("/register", homeController.registration);
app.get("/home/:userHome", homeController.sendReqParam).listen(port, () => {
  console.log(`The Express.js server has started and is listening
   ➥ on port number: ${port}`);
});

app.get("/users", usersController.getAllUsers);
app.get("/register", usersController.getRegistrationPage);
app.post("/", usersController.saveUser);


app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);

  next();
});

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

module.exports = app