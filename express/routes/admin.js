const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(`<h1> "The Add-Product page"</h1>
  <form action="/product" method="post">
  <input type="text" name="title">
    <button type="submit">Add Product</button>
  </input>
</form>`);
});

module.exports = router;
