// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaCY_J809WUKLKvKxI7GAjnLeWyy39RXM",
  authDomain: "nursery-beats-web.firebaseapp.com",
  projectId: "nursery-beats-web",
  storageBucket: "nursery-beats-web.appspot.com",
  messagingSenderId: "665642837274",
  appId: "1:665642837274:web:6bedcb21d88f2edb9db8a3",
  measurementId: "G-6RLJZLJVWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);