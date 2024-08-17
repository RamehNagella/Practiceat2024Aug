const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  console.log("<h1>Hello from Express.js </h1>");
});
router.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
