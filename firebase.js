import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBVBwdx1nC5jKgH2gu6w50WH5n6WlOYmz0",
  authDomain: "himate-a26bc.firebaseapp.com",
  projectId: "himate-a26bc",
  storageBucket: "himate-a26bc.appspot.com",
  messagingSenderId: "1024285819803",
  appId: "1:1024285819803:web:7fcd537d76f880a3a3973e"
};

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }