// Express ; Express.js is a framework, which provides some helper functions,
// 		some tools, and rules which we need to follow while developing the application

//Expressjs is also about writing middleware which is the core concept of
// express

// request=> middleware=> next => middleware => response
/*
const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("in the first middleware.");
  next();
});
app.use((req, res, next) => {
  console.log("in the second middleware.");
});
const server = http.createServer(app);
server.listen(3000);

//but
app.listen = function listern() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

hence no need to import http as its lies in app.listen

*/

// const express = require("express");
// const app = express();

// app.use("/add-product", (req, res, next) => {
//   console.log(
//     "the path of this middleware is /add-product and its url is https://localhost:3000/add-product "
//   );
//   res.send(`<h1> "The Add-Product page"</h1>
//   <form action="/product" method="post">
//   <input type="text" name="title">
//     <button type="submit">Add Product</button>
//   </input>
// </form>`);
// });
// app.use("/", (req, res, next) => {
//   res.send(`<h1> hello from express </h1>`);
// });
// app.listen(3001, () => {
//   console.log(`Server is running on http://localhost:3000/`);
// });

// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/add-product", (req, res, next) => {
//   console.log(
//     "the path of this middleware is /add-product and its url is https://localhost:3000/add-product "
//   );
//   res.send(`<h1> "The Add-Product page"</h1>
//   <form action="/product" method="post">
//   <input type="text" name="title">
//     <button type="submit">Add Product</button>
//   </input>
// </form>`);
// });

// app.use("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.use("/", (req, res, next) => {
//   res.send(`<h1> hello from express </h1>`);
// });
// app.listen(3001, () => {
//   console.log(`Server is running on http://localhost:3000/`);
// });

// app.use(bodyParser.urlencoded({extended:false}))
// with extended set to false the URL -encoded data is parsed with the
//'queryString' library, which only supports simple key-value pairs and
// does not support nested objects or arrays in the request body.

// with extended:true: extended set to true the URL -encoded data is parsed eith the
// 'qs' library, which allows for rich parsing of nested objects and arrays in the request body.
//This allows your application to handle more complex data structures sent from HTML forms or other clients.

// ************ FILTER PATH  **********************

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001/`);
});
