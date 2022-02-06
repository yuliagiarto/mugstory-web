import firebase from "firebase";
import "firebase/auth";
import "firebase/analytics";
const config = {
  apiKey: "AIzaSyABKdEkKEk7un4VR1eSYeLmIQ49VlRVCO0",
  authDomain: "mugstory-2febb.firebaseapp.com",
  projectId: "mugstory-2febb",
  storageBucket: "mugstory-2febb.appspot.com",
  messagingSenderId: "740841772157",
  appId: "1:740841772157:web:8eab9987ebdaea2ba9cd14",
  measurementId: "G-VCGRBSPTHZ",
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const firestore = firebase.firestore(firebase.app());
export { auth, firebase, firestore };
