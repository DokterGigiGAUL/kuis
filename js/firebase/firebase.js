// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJ7AdX6rrE0OylKkPYx-UWYjtYj-y4QWg",
    authDomain: "wonder-app-2426.firebaseapp.com",
    projectId: "wonder-app-2426",
    storageBucket: "wonder-app-2426.firebasestorage.app",
    messagingSenderId: "274978911943",
    appId: "1:274978911943:web:b5c763f8a8b29dc86ff0e2"
};

// Inisialisasi
export const app = initializeApp(firebaseConfig);
