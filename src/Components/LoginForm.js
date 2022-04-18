import { useState } from "react";
import firebaseAuthService from "../FirebaseAuthService";

const LoginForm = ({ existingUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    firebaseAuthService.logoutUser();
  };

  const handleResetPassword = async () => {
    if (!username) {
      alert("Enter the username");
      return;
    }
    try {
      await firebaseAuthService.sendPasswordResetEmail(username);
      alert("Email sent");
    } catch (error) {
      alert(error.message);
    }
  };

//   const handleLoginWithGoogle = async () => {
//     try {
//       await firebaseAuthService.loginWithGoogle();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome {existingUser.email} </h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="login-form">
            <label className="input-label login-label">
              Username (email):
              <input
                type="email"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
            <label className="input-label login-label">
              Password:
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <div className="button-box">
              <button className="primary-button">Login</button>
              <button
                type="button"
                className="primary-button"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
              {/* <button
                type="button"
                className="primary-button"
                onClick={handleLoginWithGoogle}
              >
                Log in Google
              </button> */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
