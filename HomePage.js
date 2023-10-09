// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRXoWAyHb9v9x8P75Cp9BdEfCHjvHJJn8",
    authDomain: "paper-trading-simulator-f71ce.firebaseapp.com",
    databaseURL: "https://paper-trading-simulator-f71ce-default-rtdb.firebaseio.com",
    projectId: "paper-trading-simulator-f71ce",
    storageBucket: "paper-trading-simulator-f71ce.appspot.com",
    messagingSenderId: "631191317349",
    appId: "1:631191317349:web:4c2bb236136ccf58f7cf8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function getCurrentDateString() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  // Create a string in the format YYYY-MM-DD (e.g., "2023-10-09")
  const dateString = `${year}-${month}-${day}`;
  
  return dateString;
}

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const loggedIn = localStorage.getItem('loggedIn');

if (loggedInUser) {
  // You can access user properties, such as email, UID, etc.
  const userEmail = loggedInUser.email;
  const userUID = loggedInUser.uid;

    //new user set initial properties for database table/node user_assets
    if(loggedIn == "false"){
      console.log("logged In status is false");
      const assetData = [
        {
          asset: "$",
          amount: 1000000
        }
      ];
      
      set(ref(database, 'user_assets/' + userUID), {
        assets: assetData
      })
    }
    else{
      // Reference to the user's assets
      const assetsRef = ref(database, 'user_assets/' + userUID + '/assets');

      // Fetch the data
      get(assetsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const assetData = snapshot.val();
            console.log("user's " + userUID + " asset data:   " + assetData);
            // Do something with assetData, which will be an array
            user_stocks_array = [];
            for (let i = 0; i < assetData.length; i++) {
              if (assetData[i].asset === "$") {
                document.getElementById("dollarAmount").innerText ="$" +  assetData[i].amount;
              }
              else{
                //TO-D0: here is where i should probably add the code to add the stocks to table with their prices
                user_stocks_array.push(assetData[i].asset);
              }
            }
          } else {
            console.log("No data available for this user");
          }
        })
        .catch((error) => {
          console.error("Error fetching asset data:", error);
        });
    }
  // Use the user information to personalize the dashboard content or perform actions.
  // For example, display the user's email on the dashboard.
  console.log('user\'s stocks: ', user_stocks_array)
  document.getElementById('displayEmail').innerText = "Hello:  " + userEmail;
  document.getElementById('currentDate').innerText = getCurrentDateString();

} else {
  console.log("logged in user is not found in local storage. Please");
  // Handle the case where no user information is found (user not logged in)
  // You can redirect the user back to the login page or take appropriate action.
}