import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import styles from "./style.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from "react-router-dom";
import React from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const naviagte = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
      setIsLoading(true); // Start loading
  
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the correct content type
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text(); 
        toast.error(errorData || "Login failed, please try again.");
        
      }
      const data = await res.json();
      toast.success("Login successful!");
      localStorage.setItem("token", data.token)
      naviagte("/product")
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); 
    }
  };
  return (
    <>
    <div className={styles.formContainer}>
       <div className={styles.formWrapper}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>username</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={18} />
              <input
                id="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="john erik"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <button 
                type="button"
                className={styles.forgotPassword}
                onClick={() => toast("Check your username for reset instructions.")}
              >
                Forgot password?
              </button>
            </div>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.rememberMe}>
            <div className={styles.checkboxWrapper}>
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe} 
                onChange={() => setRememberMe(!rememberMe)} 
                className={styles.checkbox}
              />
              <label
                htmlFor="rememberMe"
                className={styles.checkboxLabel}
              >
                Remember me for 30 days
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className={styles.signupPrompt}>
          <p>Don't have an account? <span  className={styles.signupLink}>Sign up</span></p>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default LoginForm;
