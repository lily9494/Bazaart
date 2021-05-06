const port = 8080;
http = require("http");
express = require("express");
layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

app = express();
app.use(express.static
  ("public"));
app.use(layouts);
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
    }));
    app.get("/profile/:myName",  homeController.respondWithName);
    app.get("/profile",  homeController.respondWithName);
    app.get("/",  homeController.respondInfo);
app.get("/home/:userHome", homeController.sendReqParam)
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening
   ➥ on port number: ${port}`);
   });
   app.get("/register", homeController.registration)
 ;
   app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);

    next();
   });
   app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
   })
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