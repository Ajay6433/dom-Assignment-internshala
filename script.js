const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", registeringStudentData);

function registeringStudentData(event) {
  event.preventDefault();
  const studentName = document.getElementById("studentName").value;
  const studentID = document.getElementById("studentID").value;
  const emailID = document.getElementById("emailID").value;
  const contactNo = document.getElementById("contactNo").value;

  // Validate all fields are filled
  if (!studentName || !studentID || !emailID || !contactNo) {
    alert("Please fill in all fields.");
    return;
  }

  // Validate that studentName is not empty and only contains letters and spaces
  const namePattern = /^[a-zA-Z\s]+$/;
  if (!namePattern.test(studentName)) {
    alert("Student name must contain only letters and spaces.");
    return;
  }

  // Validate that studentID is a number, not empty, and not a floating point number
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

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailID)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate contact number (10 digits)
  const contactPattern = /^\d{10}$/;
  if (!contactPattern.test(contactNo)) {
    alert("Contact No. must be a 10-digit number.");
    return;
  }

  // Storing the student data in LocalStorage in the form of Array of objects
  const studentData = {
    name: studentName,
    id: studentID,
    email: emailID,
    contact: contactNo,
  };

  const studentDataArray = localStorage.getItem("students");
  localStorage.setItem(
    "students",
    JSON.stringify(
      studentDataArray
        ? [...JSON.parse(studentDataArray), studentData]
        : [studentData]
    )
  );

  // Storing individual student data in LocalStorage
  localStorage.setItem("studentName", studentData.name);
  localStorage.setItem("studentID", studentData.id);
  localStorage.setItem("emailID", studentData.email);
  localStorage.setItem("contactNo", studentData.contact);

  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ""; // Clear previous rows to avoid duplicates

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                        <td>${student.name}</td>
                        <td>${student.id}</td>
                        <td>${student.email}</td>
                        <td>${student.contact}</td>
                `;
    tableBody.appendChild(row);
  });

  // Clear the input fields after submission
  document.getElementById("studentName").value = "";
  document.getElementById("studentID").value = "";
  document.getElementById("emailID").value = "";
  document.getElementById("contactNo").value = "";

  console.log(studentName, studentID, emailID, contactNo);
}

// default load values from localStorage when the page loads
window.onload = function () {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ""; // Clear previous rows

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                        <td>${student.name}</td>
                        <td>${student.id}</td>
                        <td>${student.email}</td>
                        <td>${student.contact}</td>
                `;
    tableBody.appendChild(row);
  });
};
