import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validations/registerSchema";

export default function RegisterForm({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, reset, 
    formState: { errors, isValid, isSubmitting } } = useForm({
      resolver: yupResolver(registerSchema),
      mode: "onTouched"
    });

  const onSubmit = (data) => {
    console.log("REGISTER SUBMIT:", data);
    setSuccess("✅ Account created!");
    
    const userData = { 
      name: data.fullName, 
      email: data.email, 
      isLoggedIn: true 
    };
    localStorage.setItem('user', JSON.stringify(userData));

    setTimeout(() => onSwitchToLogin(), 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {success && <div className="alert alert-success py-2 small">{success}</div>}

      <div className="mb-3 text-start">
        <label className="form-label small fw-bold">Full Name</label>
        <input type="text" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} {...register("fullName")} />
        <div className="invalid-feedback">{errors.fullName?.message}</div>
      </div>

      <div className="mb-3 text-start">
        <label className="form-label small fw-bold">Email</label>
        <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register("email")} />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>

      <div className="mb-3 text-start">
        <label className="form-label small fw-bold">Password</label>
        <input type={showPassword ? "text" : "password"} className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register("password")} />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>

      <div className="mb-4 text-start">
        <label className="form-label small fw-bold">Confirm Password</label>
        <input type={showPassword ? "text" : "password"} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} {...register("confirmPassword")} />
        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
      </div>

      <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm" style={{backgroundColor: '#91befa', border: 'none'}} disabled={!isValid}>
        Create account
      </button>

      <p className="text-center small mt-4">
        Already have an account? <button type="button" className="btn btn-link btn-sm p-0 fw-bold text-decoration-none" onClick={onSwitchToLogin}>Login</button>
      </p>
    </form>
  );
}