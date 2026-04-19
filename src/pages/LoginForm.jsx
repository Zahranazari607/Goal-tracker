import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";

export default function LoginForm({ onSwitchToRegister, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, reset, 
    formState: { errors, isValid, isSubmitting } } = useForm({
      resolver: yupResolver(loginSchema),
      mode: "onTouched"
    });

  const onSubmit = (data) => {
    console.log("LOGIN SUBMIT:", data);
    setSuccess("✅ Login successful!");
    
    const extractedName = data.email.split('@')[0];
    
    const userData = { 
      name: extractedName, 
      email: data.email, 
      isLoggedIn: true 
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    setTimeout(() => onLogin(userData), 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {success && <div className="alert alert-success py-2 small">{success}</div>}

      <div className="mb-3 text-start">
        <label className="form-label small fw-bold">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="you@example.com"
          {...register("email")}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>

      <div className="mb-3 text-start">
        <label className="form-label small fw-bold">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="••••••••"
          {...register("password")}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <div className="form-check text-start">
          <input className="form-check-input" type="checkbox" id="shPass" onChange={(e) => setShowPassword(e.target.checked)} />
          <label className="form-check-label small" htmlFor="shPass" style={{cursor: 'pointer'}}>Show password</label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={!isValid} style={{backgroundColor: '#91befa', border: 'none'}}>
        Login
      </button>

      <p className="text-center small mt-4">
        Don't have an account? <button type="button" className="btn btn-link btn-sm p-0 fw-bold text-decoration-none" onClick={onSwitchToRegister}>Create one</button>
      </p>
    </form>
  );
}