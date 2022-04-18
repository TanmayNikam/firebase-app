import firebase from "./FirebaseConfig.js";

import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
    signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut
} from "firebase/auth";
  

const auth = firebase.auth();

const registerUser = (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password);
}

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
    return signOut(auth);
};

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  onAuthStateChanged(auth, (user) => {
    handleAuthChange(user);
  });
};

const resetPasswordEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
};


const firebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    sendPasswordResetEmail: resetPasswordEmail,
    loginWithGoogle,
    subscribeToAuthChanges
};

export default firebaseAuthService;