const http = require("http");
const fs = require("fs");
require("dotenv").config();

const { APP_LOCALHOST, APP_PORT } = process.env;

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
});
server.listen(APP_PORT, hostname, () => {
  console.log(`Server running at http://${APP_LOCALHOST}:${APP_PORT}`);
});
