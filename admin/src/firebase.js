import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDpN-o8wtZN1YtPLMa_JQInNPh5a2BNSnY",
  authDomain: "netflix-dda77.firebaseapp.com",
  projectId: "netflix-dda77",
  storageBucket: "netflix-dda77.appspot.com",
  messagingSenderId: "458824410265",
  appId: "1:458824410265:web:6aed0ac2e82584d6874408",
  measurementId: "G-KQKZ4XMTT3",
};

const app=initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
