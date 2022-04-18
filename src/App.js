/* eslint-disable no-unused-vars */
import './App.css';
import { useState } from "react";
import firebaseAuthService from './FirebaseAuthService';
import LoginForm from './Components/LoginForm';

function App() {

  const [user, setUser] = useState(null);
  firebaseAuthService.subscribeToAuthChanges(setUser);


  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
    </div>
  );
}

export default App;
