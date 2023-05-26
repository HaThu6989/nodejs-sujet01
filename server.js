const http = require("http");
const fs = require("fs");
require("dotenv").config();

const { APP_LOCALHOST, APP_PORT } = process.env;

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
  console.log("url", url);

  if (url === "style") {
    const css = fs.readFileSync(`./assets/css/style.css`);
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(css);
    res.end();
    return;
  }

  if (url === "" && req.method === "GET") {
    const template = fs.readFileSync(`./view/home.html`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(template);
    return;
  }

  if (url === "users" && req.method === "GET") {
    const users = fs.readFileSync(`./view/users.html`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(users);
    return;
  }

  if (url === "users" && req.method === "POST") {
    const users = fs.readFileSync(`./view/users.html`);

    const dataUsers = fs.readFileSync(`./Data/students.json`, "utf8");
    const data = JSON.parse(dataUsers).students;
    console.log("data", data); //tableau

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(users);
    return;
  }

  if (url === "calculatrice" && req.method === "GET") {
    const calculatrice = fs.readFileSync(`./view/calculatrice.html`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(calculatrice);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "404 Not found" }));
});
server.listen(APP_PORT, APP_LOCALHOST, () => {
  console.log(`Server running at http://${APP_LOCALHOST}:${APP_PORT}`);
});
