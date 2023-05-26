const fs = require("fs");

// Function to read the students data from the JSON file
function readStudentData() {
  try {
    const data = fs.readFileSync(`./Data/students.json`, 'utf-8');
    const students = JSON.parse(data);
    // Make sure that the data read from the JSON file is an array.
    return Array.isArray(students) ? students : [];
  } catch (error) {
    console.error('Error reading student data:', error);
    return [];
  }
}

// Function to write the student data to the JSON file
function writeStudentData(students) {
  try {
    fs.writeFileSync('./Data/students.json', JSON.stringify(students, null, 2));
    console.log('Student data written to students.json');
  } catch (error) {
    console.error('Error writing student data:', error);
  }
}

// Function to delete a student by index
function deleteStudent(index) {
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

// Generate the HTML to display student data
function htmlCode(listStudents) {
  let html = '<h1>Student List</h1>';
  html += '<ul id="student-list">';
  listStudents.forEach((student, index) => {
    html += `<li id="student-${index}">${student.name} - ${student.date} <button onclick="deleteStudent(${index})">Delete</button></li>`;
  });
  html += '</ul>';
  html += `
    <script>
      function deleteStudent(index) {
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

// Function to generate HTML code for the calculator memory
function generateMemoryHTML(memory) {
  let memoryHTMLCode = '';

  // Generate HTML for each memory item
  memory.forEach((item, index) => {
    memoryHTMLCode += `
      <li>
        <span>Number 1: ${item.number1}</span>
        <span>Number 2: ${item.number2}</span>
        <span>Operator: ${item.operator}</span>
        <span>Total: ${item.total}</span>
        <button onclick="deleteMemory(${index})">Delete</button>
      </li>
    `;
  });

  return memoryHTMLCode;
}


// Export functions
module.exports = {
  readStudentData,
  writeStudentData,
  deleteStudent,
  htmlCode,
  generateMemoryHTML
};
