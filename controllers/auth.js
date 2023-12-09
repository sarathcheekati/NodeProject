const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //const isLoggedIn = req.get("Cookie")?.split("=")[1].trim() === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("6572fdb872ccfb4554698e12")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((error) => {
        console.log(error);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect("/login");
  });
};
