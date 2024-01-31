import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBG8SkaF2rB5k6rAXDwrGLORRHpBX18Nkk",
  authDomain: "react-chat-5494b.firebaseapp.com",
  projectId: "react-chat-5494b",
  storageBucket: "react-chat-5494b.appspot.com",
  messagingSenderId: "575451672831",
  appId: "1:575451672831:web:514d24483f6a51763d5cca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
