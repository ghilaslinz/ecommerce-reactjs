import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDxO821gkuljuQlkOqZd81MIEVwmk8lDo4",
  authDomain: "challenge-db28b.firebaseapp.com",
  databaseURL: "https://challenge-db28b.firebaseio.com",
  projectId: "challenge-db28b",
  storageBucket: "challenge-db28b.appspot.com",
  messagingSenderId: "32432142469",
  appId: "1:32432142469:web:a831ce169dcd86732d11ec"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };