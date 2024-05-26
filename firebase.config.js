// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmVyajwbueyo0aEJsxajOsOe5ZVmVhwaU",
  authDomain: "bharatshop-c98ac.firebaseapp.com",
  projectId: "bharatshop-c98ac",
  storageBucket: "bharatshop-c98ac.appspot.com",
  messagingSenderId: "30225617321",
  appId: "1:30225617321:web:5f092cb006980f88ff34b8",
  measurementId: "G-6R4D1MZC5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);