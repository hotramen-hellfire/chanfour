// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbnc8FgN47ZCdDN894Cp3RO5OZ6rf1gb4",
    authDomain: "saitama-23e80.firebaseapp.com",
    projectId: "saitama-23e80",
    storageBucket: "saitama-23e80.appspot.com",
    messagingSenderId: "843092703164",
    appId: "1:843092703164:web:9f3891b182ae1543915db9",
    measurementId: "G-GK81VGSV8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);