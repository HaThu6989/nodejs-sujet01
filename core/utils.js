const fs = require("fs");

// Function to read the students data from the JSON file
function readStudentData() {
  try {
    const data = fs.readFileSync(`./Data/students.json`, "utf-8");
    const students = JSON.parse(data);
    // make sure that the data read from the JSON file is an array.
    return Array.isArray(students) ? students : [];
  } catch (error) {
    console.error("Error reading student data:", error);
    return [];
  }
}

// Function to write the student data to the JSON file
function writeStudentData(students) {
  try {
    fs.writeFileSync("./Data/students.json", JSON.stringify(students, null, 2));
    console.log("Student data written to students.json");
  } catch (error) {
    console.error("Error writing student data:", error);
  }
}

// Delete user selected
function deleteStudent(usersHtml, indexDataDelete) {
  try {
    // fs.writeFileSync("./Data/students.json", JSON.stringify(students, null, 2));
    console.log("Student data deleted to students.json");
    const newData = usersHtml.filter((elm, index) => index !== indexDataDelete);
    return newData;
  } catch (error) {
    console.error("Error writing student data:", error);
  }
}

// Generate the HTML to display student data
function htmlCode(listStudents) {
  let html = "<h1>Student List</h1>";
  html += "<ul>";
  listStudents.forEach((student, index) => {
    html += `<li>${student.name} - ${student.date}</li>
    <form action="/users/${index}/delete" method="POST">
      <button>Delete</button>
    </form>
    `;
  });
  html += "</ul>";
  return html;
}

// export functions
module.exports = {
  readStudentData,
  writeStudentData,
  deleteStudent,
  htmlCode,
};
