// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqwfItxMBXev2Dh13gER63m61dKlx4i34",
    authDomain: "cartique-auth.firebaseapp.com",
    projectId: "cartique-auth",
    storageBucket: "cartique-auth.firebasestorage.app",
    messagingSenderId: "822631708645",
    appId: "1:822631708645:web:ff3f9bc00555f92282210c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
