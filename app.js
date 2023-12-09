const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6572fdb872ccfb4554698e12")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://cheekatisarath:Saketh1234@cluster0.vnp9m5r.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "sarath",
            email: "cheekatisarath@gmail.com",
            cart: {
              items: [],
            },
          });
          user.save();
        }
      })
      .catch((error) =>
        console.log("error occured when fetching user details,", error.message)
      );

    console.log("Connected to the Database successfully");
    app.listen(3000);

    console.log(
      "Server started and listening for the requests on the localhost port 3000"
    );
  })
  .catch((err) => {
    console.log(err);
  });
