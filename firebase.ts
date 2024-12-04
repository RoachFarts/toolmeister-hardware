// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA23hWSUw6J2Vwrk9Hix75D70ds1Ff9ef4",
    authDomain: "toolmeistersia.firebaseapp.com",
    projectId: "toolmeistersia",
    storageBucket: "toolmeistersia.firebasestorage.app",
    messagingSenderId: "951476760181",
    appId: "1:951476760181:web:32805a9084650af8b7923c"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};