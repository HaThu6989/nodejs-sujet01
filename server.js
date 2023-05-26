// Required modules
const http = require("http");
const fs = require("fs");
require("dotenv").config();
const querystring = require("querystring");

// Custom functions
const utils = require("./core/utils");
const { readStudentData, writeStudentData, htmlCode } = utils;

// Environment variables
const { APP_LOCALHOST, APP_PORT } = process.env;

// Create an HTTP server
const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
  // console.log("url", url);

  // Serve CSS file
  if (url === "style") {
    const css = fs.readFileSync(`./assets/css/style.css`);
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(css);
    res.end();
    return;
  }

  // Home page
  if (url === "" && req.method === "GET") {
    const template = fs.readFileSync(`./view/home.html`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(template);
    return;
  }

  // Add new user
  if (url === "users" && req.method === "POST") {
    let body = "";

    // Collect the request data
    req.on("data", (chunk) => {
      // console.log("chunk.toString", chunk.toString);
      body += chunk.toString();
      console.log("body", body);
    });

    // Process the request data
    req.on("end", () => {
      const data = querystring.parse(body);
      // console.log("data", data);
      const name = data.name;
      const date = data.date;

      // Read the current student data
      const students = readStudentData();

      // Add the new student to the array
      students.push({ name, date });

      // Write the updated student data to the JSON file
      writeStudentData(students);

      // Read the updated student data
      const updatedStudents = readStudentData();

      // Read the users.html file
      const usersHTML = fs.readFileSync("./view/users.html", "utf8");

      // Replace the <!-- STUDENT_LIST --> placeholder with the generated HTML
      const updatedHTML = usersHTML.replace(
        "<!-- STUDENT_LIST -->",
        htmlCode(updatedStudents)
      );

      // Set the response headers
      res.writeHead(200, { "Content-Type": "text/html" });

      // Send the updated HTML response
      res.end(updatedHTML);
    });

    return;
  }

  // Display user list
  if (url === "users" && req.method === "GET") {
    const usersFilePath = "./view/users.html";
    let usersHtml = fs.readFileSync(usersFilePath, "utf8");
    const students = readStudentData();
    usersHtml = usersHtml.replace("<!-- STUDENT_LIST -->", htmlCode(students));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(usersHtml);

    return;
  }

  // Display user list
  if (url === "users" && req.method === "DELETE") {
    const usersFilePath = "./view/users.html";
    let usersHtml = fs.readFileSync(usersFilePath, "utf8");
    const students = readStudentData();
    usersHtml = usersHtml.replace("<!-- STUDENT_LIST -->", htmlCode(students));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(usersHtml);

    return;
  }

  // Delete one user in list
  if (url === `users/:index/delete` && req.method === "POST") {
    console.log("req.params.index", req.params.index);
    const usersFilePath = "./view/users.html";
    let usersHtml = fs.readFileSync(usersFilePath, "utf8");
    const students = deleteStudent(usersHtml, req.params.index);
    usersHtml = usersHtml.replace("<!-- STUDENT_LIST -->", htmlCode(students));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(usersHtml);

    return;
  }

  // Serve the calculatrice.html page
  if (url === "calculatrice" && req.method === "GET") {
    const calculatrice = fs.readFileSync(`./view/calculatrice.html`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(calculatrice);
    return;
  }

  // Handle 404 Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "404 Not found" }));
});

// Start the server
server.listen(APP_PORT, APP_LOCALHOST, () => {
  console.log(`Server running at http://${APP_LOCALHOST}:${APP_PORT}`);
});
