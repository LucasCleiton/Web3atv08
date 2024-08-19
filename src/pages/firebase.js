import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Importar o Firestore

const firebaseConfig = {
    apiKey: "AIzaSyBhy2oZsFwTyEbbNI0EgIh7iGvEJHX9QCE",
    authDomain: "fir-85706.firebaseapp.com",
    projectId: "fir-85706",
    storageBucket: "fir-85706.appspot.com",
    messagingSenderId: "779987993406",
    appId: "1:779987993406:web:c3a9c3a64d5157cec7e26f",
    measurementId: "G-1VDQ46XQR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Inicializar o Firestore

export { auth, db };  // Exportar o Firestore
