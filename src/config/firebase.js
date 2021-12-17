// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4FD_rS2lILV6MJgLxERcxegVQPmVprrc",
  authDomain: "shoe-store-2021.firebaseapp.com",
  projectId: "shoe-store-2021",
  storageBucket: "shoe-store-2021.appspot.com",
  messagingSenderId: "147665706922",
  appId: "1:147665706922:web:3953433c05eccd294fd5d3",
  measurementId: "G-XX40WBTRYZ"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);