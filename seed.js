const mongoose = require("mongoose"),
  User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/bazaart", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
});
mongoose.connection;
var contacts = [
  {
    firstName: "Jon",
    lastName: "Tester",
    email: "jon@tester.com",
    username: "jonX",
  },
  {
    firstName: "Max",
    lastName: "Tester",
    email: "max@tester.com",
    username: "MaxtheGreat",
  },
  {
    firstName: "Lydia",
    lastName: "Tester",
    email: "lydia@tester.com",
    username: "SmartLydia",
  },
];
User.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });
var commands = [];
contacts.forEach((c) => {
  commands.push(
    User.create({
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      username: c.username,
    })
  );
});
Promise.all(commands)
  .then((r) => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`);
  });
