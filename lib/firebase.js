import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIq2KtAEvYkpclAR_dPoUosyLPwIx1_AU",
    authDomain: "yoink-83218.firebaseapp.com",
    projectId: "yoink-83218",
    storageBucket: "yoink-83218.firebasestorage.app",
    messagingSenderId: "635448619590",
    appId: "1:635448619590:web:de7308f99a7f2b0b731047",
    measurementId: "G-D3861DB62B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

