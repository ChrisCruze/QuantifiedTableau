import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// const firebaseConfig = firebase.initializeApp({
//   apiKey: "AIzaSyADoGkQGpA9Acc3wwb7rLM7BPAGXSRy84g",
//   authDomain: "aesopadvisory.firebaseapp.com",
//   databaseURL: "https://aesopadvisory.firebaseio.com",
//   projectId: "aesopadvisory",
//   storageBucket: "aesopadvisory.appspot.com",
//   messagingSenderId: "819727103747",
//   appId: "1:819727103747:web:ba8243dbe558b591"
// });

// const firebaseConfig = firebase.initializeApp({
//   apiKey: "AIzaSyDSdG5gBDPdlH9h_8v4y1cL86ve4uNZQsM",
//   authDomain: "debtprojectionmodel.firebaseapp.com",
//   databaseURL: "https://debtprojectionmodel.firebaseio.com",
//   projectId: "debtprojectionmodel",
//   storageBucket: "debtprojectionmodel.appspot.com",
//   messagingSenderId: "251800390384",
//   appId: "1:251800390384:web:50304ff7c338a673"
// });

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD0RdHCra6P6639Ho_1FuxEq3MGQyxV0Lw",
  authDomain: "taskrrrr.firebaseapp.com",
  databaseURL: "https://taskrrrr.firebaseio.com",
  projectId: "taskrrrr",
  storageBucket: "taskrrrr.appspot.com",
  messagingSenderId: "717116545352"
});

export { firebaseConfig as firebase };
