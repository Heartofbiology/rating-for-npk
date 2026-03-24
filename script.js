// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDs8kG7s4LB1UptcncoIR0pfYwvz37Xo_8",
  authDomain: "rating-67664.firebaseapp.com",
  projectId: "rating-67664",
  storageBucket: "rating-67664.firebasestorage.app",
  messagingSenderId: "3648830338",
  appId: "1:3648830338:web:556e4603e908f790d4ed9b",
  measurementId: "G-JHPNQJW53Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let selectedRating = 0;

// Select rating
window.rate = function(stars) {
    selectedRating = stars;
    alert("You selected " + stars + " ⭐");
}

// Submit feedback
window.submitFeedback = async function() {
    let comment = document.getElementById("comment").value;

    if (selectedRating === 0 || comment === "") {
        alert("Please give rating and comment");
        return;
    }

    try {
        await addDoc(collection(db, "feedback"), {
            rating: selectedRating,
            comment: comment,
            time: new Date()
        });

        alert("✅ Feedback submitted!");

        document.getElementById("comment").value = "";
        selectedRating = 0;

        loadFeedback();
    } catch (error) {
        alert("❌ Error: " + error);
    }
}

// Load feedback
async function loadFeedback() {
    let feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "feedback"));

    querySnapshot.forEach((doc) => {
        let data = doc.data();

        let div = document.createElement("div");
        div.className = "feedback";
        div.innerHTML = "⭐ " + data.rating + "<br>" + data.comment;

        feedbackList.appendChild(div);
    });
}

// Load on start
loadFeedback();
