import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm7XuHOFn_EdYkKTVaEScpe_77kvze6NA",
  authDomain: "my-reception-app.firebaseapp.com",
  projectId: "my-reception-app",
  storageBucket: "my-reception-app.appspot.com",
  messagingSenderId: "285267487324",
  appId: "1:285267487324:web:82588b3bc1216a564c9499",
  measurementId: "G-055ENW4SC8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

let analytics;

if (typeof window !== "undefined") {
  // Check if the current environment supports Firebase Analytics
  isSupported().then((supported) => {
    if (supported) {
      // If Firebase Analytics is supported, initialize it
      analytics = getAnalytics(app);
    } else {
      // If Firebase Analytics is not supported, log a message
      console.log("Firebase Analytics is not supported in this environment.");
    }
  });
}

export { auth, analytics };
