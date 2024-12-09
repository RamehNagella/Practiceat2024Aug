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
  const zeroNums = arr.filter((num) => num === 0);

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

const countryData = async function (countryName) {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/name/${countryName}`
    );

    if (!response.status === 200) {
      return "invalid input.";
    }

    const data = await response.json();

    // console.log(">>", typeof data); //>> object
    // console.log("///", data.length);
    // console.log(">>>>>>>>", data[0]);
    // console.log("??", `${data[0]}`); //?? [object Object]
    let data1;
    if (data.length > 1) {
      data1 = data[0].name === countryName ? data[0] : data[1];
    } else {
      data1 = data[0];
    }

    // console.log("1111", data1);
    const requiredData = {
      Name: data1.name,
      language: data1.languages,
      currency: data1.currencies,
      population: data1.population,
      flag: data1.flag
    };
    // console.log(">>>", requiredData);
    return requiredData;
  } catch (error) {
    console.error(error);
  }
}; //******************************************************
console.log("output", countryData("usa"));
///THIS WILL ALWAYS RETURN A PROMISE ITS NOT A FUNCTION IT'S PROMISE HENCE RETURN PENDING PROMISE.
// output Promise { <pending> }

//because infront of function async keyword is there which will make the function to promise
//hence to get the required result we need to handle the funciton output i.e. promise
(async () => {
  const result = await countryData("india");
  console.log("rrr", result);
})();
// // // or
countryData("argentina")
  .then((res) => {
    console.log("aaa", res);
  })
  .catch((error) => {
    console.log(error);
  });

// we cannot use new Promise() constructor and async/await in one function

// const genderApiPr = function (name) {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = fetch(`https://api.genderize.io?name=${name}`);
//       const data = response.json();
//       resolve(data);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // //this way of writing promise is also NOT   correct *****************

// // // correct version

const genderApiPr = function (name) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.genderize.io?name=${name}`)
      .then((res) => {
        // console.log(">>", res); this will give pending response
        // resolve(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

(async () => {
  const data = await genderApiPr("ramesh");
  console.log("////", data);
})();
