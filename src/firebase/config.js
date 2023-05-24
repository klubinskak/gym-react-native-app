import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  getAuth,
  signOut
} from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";




const firebaseConfig = {
  apiKey: "AIzaSyCF7sinHZ5a6RFBCgGBOMo6Js6fWLWk6i4",
  authDomain: "gym-app-b6efc.firebaseapp.com",
  projectId: "gym-app-b6efc",
  storageBucket: "gym-app-b6efc.appspot.com",
  messagingSenderId: "488526852775",
  appId: "1:488526852775:web:1ac4fd35ce23dc7a5fa182",
  measurementId: "G-TE0K7XN1BR",
  databaseURL: 'https://gym-app-b6efc-default-rtdb.europe-west1.firebasedatabase.app'
};


let app;



if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = getDatabase(app);


const logout = () => {
  signOut(auth);
};

const auth = getAuth(app);



export { firebase, auth, logout };

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  })
}


export const fetchUserInfo = () => {
  var data = [];
  firebase.firestore().collection('user-info').get().then((querySnapshot) => {
    querySnapshot.forEach(snapshot => {
      data.push(snapshot.data());
    })
  })
  return data;
}

export const postUserInfo = (data) => {
  console.log('Data from post user', data);
  firebase.firestore().collection('user-info').doc().set({
    BMI: data.BMI,
    BMR: data.BMR,
    age: data.age,
    gender: data.gender,
    height: data.height,
    weight: data.weight
  }).then(() => {
    console.log('Successfully added to DB.')
  })
}

