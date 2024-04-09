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
      <h1>Welcome to Food Aid!</h1>
      Log in or Register to Start Using!
      <br />
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
      <br />
      <br />
      <Link to="/auth/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default AuthModule;
