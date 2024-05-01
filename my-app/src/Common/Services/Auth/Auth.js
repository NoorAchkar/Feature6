import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

const AuthModule = () => {
  const navigate = useNavigate();

  // Redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // Auth Page
  return (
    <div>
      <br />
      <br />
      <div className="intro">
      <h1>Welcome to Food Aid!</h1>
      <p>Log in or Register to Start Using the App!</p>
      </div>
      <br />
      <div class="login-container">
        <Link to="/auth/login" class="login">
          <button>Login</button>
        </Link>
        <Link to="/auth/register" class="register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthModule;
