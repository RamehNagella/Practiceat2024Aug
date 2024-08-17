const http = require("http");

const routes = require("./routes");
const fs = require("fs");

const server = http.createServer(routes);

console.log(routes.handler);
console.log(routes.someText);
// server.listen(3000);
