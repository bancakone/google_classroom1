import React from 'react';
import './LoginPage.css'; // le fichier CSS associé


function LoginPage() {
  return (
    <div className="login-container">
      {/* Left - Form */}
      <div className="login-left">
        <h2>Login</h2>
        <form>
          <label>Email address</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="login-options">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember"> Remember me</label>
            </div>
            <a href="/">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <p className="signup-text">
            Don’t have an account? <a href="/">Sign up</a>
          </p>
        </form>
      </div>

      {/* Right - Illustration */}
      <div className="login-right">
        <img src="./login.jpeg" alt="Project illustration" />
       
      </div>
    </div>
  );
}

export default LoginPage;
