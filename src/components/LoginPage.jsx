import React, { useState } from 'react';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données de connexion:', formData);
  };

  const handleForgotPassword = () => {
    console.log('Mot de passe oublié cliqué');
    // Ajoutez ici la logique pour gérer le mot de passe oublié
  };

  return (
    <div className="page-container">
      <div className="illustration-container">
        <div className="illustration-content">
          <h2>Rejoignez notre communauté créative</h2>
          <p>Partagez vos œuvres et découvrez des talents inspirants</p>
          <div className="decorative-shapes">
            <div className="shape1"></div>
            <div className="shape2"></div>
            <div className="shape3"></div>
          </div>
        </div>
      </div>
      
      <div className="form-container">
        <div className="login-card">
          <div className="card-header">
            <h1>Welcome Back</h1>
            <p className="subtitle">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">
                <FiMail className="input-icon" /> Email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <FiLock className="input-icon" /> Mot de passe
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Se souvenir de moi</label>
              </div>
              <button 
                type="button"
                className="forget-password"
                onClick={handleForgotPassword}
              >
                Mot de passe oublié?
              </button>
            </div>

            <button type="submit" className="login-button">
              Connexion
            </button>

            <div className="social-login">
              <p>Ou connectez-vous avec</p>
              <div className="social-icons">
                <button type="button" className="social-btn google">
                  <FiMail /> Google
                </button>
                <button type="button" className="social-btn facebook">
                  <FiUser /> Facebook
                </button>
              </div>
            </div>

            <p className="signup-link">
              Pas encore membre? <Link to="/register">S'inscrire</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;