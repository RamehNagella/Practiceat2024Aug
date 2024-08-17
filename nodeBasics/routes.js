const fs = require("fs");

const requestHandler = (req, res, next) => {
  const url = req.on;
  if (url === "/") {
    console.log(3 + 4);
    req.end();
  }
  if (url === "/message" && method === "post") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message);
    });
  }
};
module.exports = requestHandler();

//export using object notation
// module.exports = {
//   handler: requestHandler,
//   someText: "some hard copied text"
// };
//  or
// exports.handler = requestHandler;
// exports.someText = "somcopied Text";
