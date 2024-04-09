import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./Auth/AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();
  const isAuthorized = checkUser();

  useEffect(() => {
    if (!isAuthorized) {
      // Alert the user and redirect or block access
      alert("Unauthorized!");
      navigate('/auth/'); // Redirect to auth page or any other public route
    }
  }, [isAuthorized, navigate]); // Ensures effect runs only when authorization status changes

  return (
    <>
      {isAuthorized && <Component {...rest} />}
    </>
  );
};

export default ProtectedRoute;