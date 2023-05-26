const fs = require("fs");

// Function to read the students data from the JSON file
function readStudentData() {
  try {
    const data = fs.readFileSync(`./Data/students.json`, "utf-8");
    const students = JSON.parse(data);
    // Make sure that the data read from the JSON file is an array.
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

// Function to delete a student by index
function updateStudentsAfterDelete(index) {
  // Read the current student data
  const students = readStudentData();

  // Check if the index is valid
  if (index >= 0 && index < students.length) {
    // Remove the student from the array
    students.splice(index, 1);

    // Write the updated student data to the JSON file
    writeStudentData(students);
  }
}

function calculatrice(number1, number2, operator) {
  let total;

  switch (operator) {
    case "add":
      total = number1 + number2;
      break;
    case "mult":
      total = number1 * number2;
      break;
    default:
      total = 0;
  }
  return total;
}

function renderCalculList(listCalcul) {
  let htmlCalcul = '<ul id="student-list">';
  listCalcul.forEach((calcul, index) => {
    htmlCalcul += `<li id="student-${index}">${student.name} - ${student.date} <button onclick="handleDeleteStudent(${index})">Delete</button></li>`;
  });
  htmlCalcul += "</ul>";
}

// Generate the HTML to display student data
function htmlCode(listStudents) {
  let html = "<h1>Student List</h1>";
  html += '<ul id="student-list">';
  listStudents.forEach((student, index) => {
    html += `<li id="student-${index}">${student.name} - ${student.date} <button onclick="handleDeleteStudent(${index})">Delete</button></li>`;
  });
  html += "</ul>";
  html += `
    <script>
      function handleDeleteStudent(index) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/delete");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              // Delete the corresponding list item
              const listItem = document.getElementById("student-" + index);
              if (listItem) {
                listItem.remove();
              }
            }
          }
        };
        xhr.send("index=" + index);
      }
    </script>
  `;
  return html;
}

// Export functions
module.exports = {
  readStudentData,
  writeStudentData,
  updateStudentsAfterDelete,
  calculatrice,
  htmlCode,
};
