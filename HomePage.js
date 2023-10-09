function currentDay(){
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formatted = month + "/" + day + "/" + year;

  document.getElementById("currentDate").textContent = formatted;
}
currentDay();

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
  // You can access user properties, such as email, UID, etc.
  const userEmail = loggedInUser.email;
  const userUID = loggedInUser.uid;

  // Use the user information to personalize the dashboard content or perform actions.
  // For example, display the user's email on the dashboard.
  document.getElementById('displayEmail').innerText = "Hello:  " + userEmail;
} else {
  console.log("logged in user is not found in local storage. Please");
  // Handle the case where no user information is found (user not logged in)
  // You can redirect the user back to the login page or take appropriate action.
}