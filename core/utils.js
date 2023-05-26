function readStudentData() {
  try {
    const data = fs.readFileSync('students.json');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading student data:', error);
    return [];
  }
}

// Function to write the student data to the JSON file
function writeStudentData(students) {
  try {
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
    console.log('Student data written to students.json');
  } catch (error) {
    console.error('Error writing student data:', error);
  }
}
