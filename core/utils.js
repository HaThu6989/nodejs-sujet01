const fs = require("fs");
// function readStudentData() {
//   try {
//     const data = fs.readFileSync(`./Data/students.json`, "utf8");
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading student data:', error);
//     return [];
//   }
// }

function readStudentData() {
    try {
      const data = fs.readFileSync(`./Data/students.json`, 'utf-8');
      const students = JSON.parse(data);
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

// Generate the HTML to display student data
function htmlCode(listStudents){
    let html = '<h1>Student List</h1>';
    html += '<ul>';
    listStudents.forEach((student) => {
        html += `<li>${student.name} - ${student.date}</li>`;
    });
    html += '</ul>';
    return html
}

module.exports = {
    readStudentData,
    writeStudentData,
    htmlCode
};