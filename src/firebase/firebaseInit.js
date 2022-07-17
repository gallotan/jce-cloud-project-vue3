import firebase from "firebase/app";
import "firebase/firestore";


var firebaseConfig = {
  apiKey: "AIzaSyBH7wbXY7DrTP0sHl1TvvmvIdsHdmmDx_w",
  authDomain: "roni-project-5b667.firebaseapp.com",
  projectId: "roni-project-5b667",
  storageBucket: "roni-project-5b667.appspot.com",
  messagingSenderId: "111649334631",
  appId: "1:111649334631:web:0cb7a6a95ade3d5a29fbc2",
  measurementId: "G-6M8VJ62KCL"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export {timestamp};
  export default firebaseApp.firestore()