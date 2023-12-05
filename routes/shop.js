const express = require("express");
const path = require("path");
const router = express.Router();
const rootDir = require("../utils/path");
const adminData = require("./admin");

router.get("/", (request, response, next) => {
  const products = adminData.products;
  response.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
});

module.exports = router;
