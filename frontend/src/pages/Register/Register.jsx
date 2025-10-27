import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm"; // Import hook
import "./Register.css";
import authService from "../../api/authService";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateRegister = (values) => {
    const newErrors = {};

    if (!values.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!values.username.trim()) {
      newErrors.username = "Username is required";
    } else if (values.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[A-Za-z0-9_]+$/.test(values.username)) {
      newErrors.username = "Username cannot contain special characters";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (strength === "Weak") {
      newErrors.password = "Password strength is too weak";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const {
    values,
    errors,
    inputRefs,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors,
  } = useForm(
    {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegister
  );

  // Password strength evaluator
  const evaluatePasswordStrength = (password) => {
    if (!password) return "";

    const rules = [/.{8,}/, /[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];

    const score = rules.reduce((acc, rule) => acc + rule.test(password), 0);

    if (score <= 2) return "Weak";
    if (score === 3) return "Medium";
    return "Strong";
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Gọi API register
      const response = await authService.register({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      //FakeAPI
      // const response = await authServiceFake.register({
      //   fullName: formData.fullName,
      //   username: formData.username,
      //   email: formData.email,
      //   password: formData.password,
      // });

      console.log("Register success:", response);

      alert("Registration successful! Please login.");
      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);

      // Hiển thị error từ backend
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({
          email: error.message || "Registration failed. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h1 className="logo">SocialApp</h1>
          <p className="tagline">
            Sign up to see photos and videos from your friends
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {/* Full Name */}
          <div className="input-group">
            <input
              ref={inputRefs.fullName}
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={values.fullName}
              onChange={handleChange}
              className={`input-field ${errors.fullName ? "input-error" : ""}`}
            />
            {errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          {/* Username */}
          <div className="input-group">
            <input
              ref={inputRefs.username}
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              className={`input-field ${errors.username ? "input-error" : ""}`}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          {/* Email */}
          <div className="input-group">
            <input
              ref={inputRefs.email}
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              ref={inputRefs.password}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={(e) => {
                handleChange(e);
                setStrength(evaluatePasswordStrength(e.target.value));
              }}
              className={`input-field ${errors.password ? "input-error" : ""}`}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>

            {/* Password Strength */}
            <div className="password-strength">
              <div className="strength-bars">
                <div
                  className={`bar ${
                    strength === "Weak"
                      ? "active weak"
                      : strength === "Medium"
                      ? "active medium"
                      : strength === "Strong"
                      ? "active strong"
                      : ""
                  }`}
                ></div>
                <div
                  className={`bar ${
                    strength === "Medium"
                      ? "active medium"
                      : strength === "Strong"
                      ? "active strong"
                      : ""
                  }`}
                ></div>
                <div
                  className={`bar ${
                    strength === "Strong" ? "active strong" : ""
                  }`}
                ></div>
              </div>
              <span className="strength-text">
                {strength && `Strength: ${strength}`}
              </span>
            </div>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <input
              ref={inputRefs.confirmPassword}
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              className={`input-field ${
                errors.confirmPassword ? "input-error" : ""
              }`}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <p className="terms-text">
            By signing up, you agree to our Terms, Data Policy and Cookies
            Policy.
          </p>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="login-section">
          <p>
            Have an account? <Link to="/">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
