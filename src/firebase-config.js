// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC3Q2-zDZ9utDorhXknluEDcjJAy9B-Ts",
  authDomain: "admin-consignment-app.firebaseapp.com",
  projectId: "admin-consignment-app",
  storageBucket: "admin-consignment-app.appspot.com",
  messagingSenderId: "69444752991",
  appId: "1:69444752991:web:8ebc05b08903e657d3edea"
};

// Initialize Firebase
const firebaseAuth = initializeApp(firebaseConfig);

export default firebaseAuth;