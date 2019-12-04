import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA6m4brL4FeDX09SqAxRpN-jXWPvbrEZvM",
  authDomain: "crwn-db-87015.firebaseapp.com",
  databaseURL: "https://crwn-db-87015.firebaseio.com",
  projectId: "crwn-db-87015",
  storageBucket: "crwn-db-87015.appspot.com",
  messagingSenderId: "84635678092",
  appId: "1:84635678092:web:584b3cd14ec39984fa92a9",
  measurementId: "G-L71Z1NYNL7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log(`Error creating user`, error.message)
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 