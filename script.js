const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", registeringStudentData);

// This function handles adding or updating student data in localStorage
function registeringStudentData(event) {
  event.preventDefault();

  // Collecting form values from input fields
  const studentName = document.getElementById("studentName").value;
  const studentID = document.getElementById("studentID").value;
  const emailID = document.getElementById("emailID").value;
  const contactNo = document.getElementById("contactNo").value;

  // Validate all fields are filled
  if (!studentName || !studentID || !emailID || !contactNo) {
    alert("Please fill in all fields.");
    return;
  }

  // Validating that studentName is not empty and only contains letters and spaces
  const namePattern = /^[a-zA-Z\s]+$/;
  if (!namePattern.test(studentName)) {
    alert("Student name must contain only letters and spaces.");
    return;
  }

  // Validating that studentID is a number, not empty, and not a floating point number
  if (studentID.trim() === "") {
    alert("Student ID cannot be empty.");
    return;
  }
  if (isNaN(studentID)) {
    alert("Student ID must be a number.");
    return;
  }
  if (studentID.includes(".") || studentID.includes(",")) {
    alert("Student ID cannot be a floating point number.");
    return;
  }

  // Validating email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailID)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validating contact number (10 digits)
  const contactPattern = /^\d{10}$/;
  if (!contactPattern.test(contactNo)) {
    alert("Contact No. must be a 10-digit number.");
    return;
  }

  // Preparing student data object
  const studentData = {
    name: studentName,
    id: studentID,
    email: emailID,
    contact: contactNo,
  };

  // Get existing students from localStorage or initialize empty array
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // Check if student with same ID exists (for update after edit)
  const existingIndex = students.findIndex((s) => s.id === studentID);
  if (existingIndex !== -1) {
    students[existingIndex] = studentData; // Update existing
  } else {
    students.push(studentData); // Add new
  }

  // Save updated students array to localStorage
  localStorage.setItem("students", JSON.stringify(students));

  // Refreshing the table to show updated data
  renderStudentTable();

  // Clear the input fields after submission
  document.getElementById("studentName").value = "";
  document.getElementById("studentID").value = "";
  document.getElementById("studentID").readOnly = false; 
  document.getElementById("emailID").value = "";
  document.getElementById("contactNo").value = "";

  console.log(studentName, studentID, emailID, contactNo);
}

// This function renders the student table from localStorage
function renderStudentTable() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ""; 

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <div class="action-buttons">
                <button type="button" onclick="editStudentData('${student.id}')">Edit</button>
                <button type="button" onclick="deleteStudentData('${student.id}')">Delete</button>
            </div>
        </td>
    `;
    tableBody.appendChild(row);
  });
}

// On page load, showing all students in the table
window.onload = function () {
  renderStudentTable();
};

// This function allows user to edit existing student data
function editStudentData(studentID) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find((s) => s.id === studentID);

  if (student) {
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentID").value = student.id;
    document.getElementById("studentID").readOnly = true; // Prevent editing ID
    document.getElementById("emailID").value = student.email;
    document.getElementById("contactNo").value = student.contact;
  } else {
    alert("Student not found.");
  }
}

// This function allows user to delete existing student data
function deleteStudentData(studentID) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students = students.filter((s) => s.id !== studentID);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudentTable(); //It refreshes the table after deletion
  alert("Student data deleted successfully.");
}
