import React, { useState } from 'react';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '', // Changé de username à email pour correspondre au backend
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirection après connexion réussie
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
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
            <Link to="/home" className="back-button text-align-center">
                <FiArrowLeft /> Accueil
                      </Link>
          <div className="card-header">
            <h1>Welcome Back</h1>
         
          </div>
  {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">
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
