//display a product on the webpage
/*
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const Product = require("./models/products.js");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/product/:prodId", (req, res, next) => {
  const prodId = req.params.prodId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        const error = new Error("could not found product!");
        throw error;
      }
      res.status(200).json({ message: "Product fetched", product: product });
    })
    .catch((err) => {
      console.log(err);
    });
});

// or

const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

const MONGODB_URI = "URL OF MONGODB CONNECTING STRING";

app.get("/employee/:employId", async (req, res, next) => {
  const employId = req.params.employId;
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db("bank");
    const employeesColl = db.collection("employees");

    const employee = await employeesColl.findOne({ employeeId: employId });
    if (!employee) {
      const error = new Error("employee is not found with specified Id");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(201)
      .json({ message: "employee data is found.", employee: employee });
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500; //defult to internal server error
    }
    res.status(error.statusCode).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
*/
const arr = [1, 1, 0, -1, -1];

function plusMinus(arr) {
  // Write your code here
  const minusNums = arr.filter((num) => num < 0);
  const positiveNums = arr.filter((num) => num > 0);
  const zeroNums = arr.filter((num) => num == 0);

  const output = [
    (positiveNums.length / arr.length).toFixed(6),
    (minusNums.length / arr.length).toFixed(6),
    (zeroNums.length / arr.length).toFixed(6)
  ];

  return output;

  // const outputInArr = arr.map((num, i, arr) => {
  //   let positiveFractionArr = [];
  //   let negativeFractionArr = [];
  //   let zeroFractionArr = [];
  //   if (num > 0) {
  //     positiveFractionArr.push(num);
  //   } else if (num < 0) {
  //     negativeFractionArr.push(num);
  //   } else {
  //     zeroFractionArr.push(num);
  //   }
  //   console.log(positiveFractionArr);
  //   const positiveFraction = (positiveFractionArr.length / 2).toFixed(6);
  //   const negativeFraction = (negativeFractionArr.length / 2).toFixed(6);
  //   const zeroFraction = (zeroFractionArr.length / 2).toFixed(6);
  //   const output = [positiveFraction, negativeFraction, zeroFraction];
  //   return [...output];
  // });
  // // console.log(outputInArr);
  // const output = [...outputInArr];
  // return output;
}
const output1 = plusMinus(arr);
const output2 = plusMinus([-4, 3, -9, 0, 4, 1]);
console.log(...output1, "\n", ...output2);
