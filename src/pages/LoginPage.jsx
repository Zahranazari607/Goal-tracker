import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm border-0 rounded-4 p-5" style={{ maxWidth: "450px", width: "100%", backgroundColor: "white" }}>
        
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            {isLoginView ? "Welcome Back" : "Create Account"}
          </h2>
        </div>

        {isLoginView ? (
          <LoginForm onLogin={onLogin} onSwitchToRegister={() => setIsLoginView(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
        )}
        
      </div>
    </div>
  );
};

export default LoginPage;