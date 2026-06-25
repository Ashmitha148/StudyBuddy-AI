// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlqHXTs-9KYzjw5BnnXW1WEcX-U1WPAT0",
  authDomain: "studybuddy-ai-c7343.firebaseapp.com",
  projectId: "studybuddy-ai-c7343",
  storageBucket: "studybuddy-ai-c7343.firebasestorage.app",
  messagingSenderId: "896882617171",
  appId: "1:896882617171:web:83ca5e0cd794a9ea368fa6",
  measurementId: "G-ZNP8R7CY1E"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);