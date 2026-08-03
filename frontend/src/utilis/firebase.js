// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "freshersai-77afe.firebaseapp.com",
  projectId: "freshersai-77afe",
  storageBucket: "freshersai-77afe.firebasestorage.app",
  messagingSenderId: "518999415495",
  appId: "1:518999415495:web:0a72c7dc37646288917ce2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }