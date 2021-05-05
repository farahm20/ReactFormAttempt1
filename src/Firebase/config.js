import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBiZTXiw3sn52TnU3pQrOknqPvIByNa_So",
    authDomain: "meelaform.firebaseapp.com",
    projectId: "meelaform",
    storageBucket: "meelaform.appspot.com",
    messagingSenderId: "962537061924",
    appId: "1:962537061924:web:c5bc43a9a1ca730836a2b1",
    measurementId: "G-XBS027JT2W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//initializing storing service and firestore service
const projectStorage = firebase.storage(); //this will startup the firebase storage
const projectFirestore = firebase.firestore(); //this will help us to interact with firestore service

//export
export { projectStorage, projectFirestore }
