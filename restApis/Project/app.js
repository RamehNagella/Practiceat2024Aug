const express = require("express");
const mongodb = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

//setting headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELET,Options"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//connecting with database
mongodb
  .connect("url")
  .then((client) => {
    client.close();
  })
  .catch();
app.listen(3100);
