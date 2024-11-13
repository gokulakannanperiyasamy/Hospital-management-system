import React, { createContext, useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.css";
import "./LoginForm.css";

// Create a Context for Authentication
const AuthContext = createContext();

// AuthProvider component to wrap around the application (or component) to provide the auth state
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  const login = () => {
    setIsAuthenticated(true);
    alert("You are logged in!");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// LoginForm Component
const LoginForm = () => {
  const { login } = useContext(AuthContext); // Access the login function from context

  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forget">
          <a href="#">Forget Password?</a>
        </div>
        <Link to="/main">
          <button type="submit" onClick={login}>
            Login
          </button>
        </Link>
        <div className="register-link">
          <Link to="/sign">
            <p>Don't have an account? <a href="#">Register</a></p>
          </Link>
        </div>
      </form>
    </div>
  );
};

// Exporting the LoginForm wrapped with the AuthProvider
const App = () => (
  <AuthProvider>
    <LoginForm />
  </AuthProvider>
);

export default App;
