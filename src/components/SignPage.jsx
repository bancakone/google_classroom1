import React, { useState } from 'react';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './SignPage.css';

const SignPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données d\'inscription:', formData);
  };

  return (
    <div className="page-container">
      <div className="illustration-container">
        <div className="illustration-content">
          <h2>Rejoignez notre communauté</h2>
          <p>Créez votre compte et commencez à partager vos créations</p>
          <div className="decorative-shapes">
            <div className="shape1"></div>
            <div className="shape2"></div>
            <div className="shape3"></div>
          </div>
        </div>
      </div>
      
      <div className="form-container">
        <div className="signup-card">
           <Link to="/home" className="back-button text-align-center">
                          <FiArrowLeft /> Accueil
                                </Link>

          <div className="card-header">
            <h1>Créez votre compte</h1>
            
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fullName">
                <FiUser className="input-icon" /> Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Votre nom complet"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">
                <FiMail className="input-icon" /> Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
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
                  minLength="8"
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

            <div className="input-group">
              <label htmlFor="confirmPassword">
                <FiLock className="input-icon" /> Confirmez le mot de passe
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="terms-group">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="acceptTerms">
                J'accepte les{' '}
                <button 
                  type="button" 
                  className="text-link"
                  onClick={() => setShowTermsModal(true)}
                >
                  conditions d'utilisation
                </button>{' '}
                et la{' '}
                <button 
                  type="button" 
                  className="text-link"
                  onClick={() => setShowPrivacyModal(true)}
                >
                  politique de confidentialité
                </button>
              </label>
            </div>

            <button type="submit" className="signup-button">
              S'inscrire
            </button>

            <div className="login-redirect">
              <p>Déjà membre? <Link to="/login">Connectez-vous</Link></p>
            </div>
          </form>
        </div>
      </div>

      {/* Modales pour les conditions */}
      {showTermsModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Conditions d'utilisation</h3>
            <p>Contenu des conditions...</p>
            <button onClick={() => setShowTermsModal(false)}>Fermer</button>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Politique de confidentialité</h3>
            <p>Contenu de la politique...</p>
            <button onClick={() => setShowPrivacyModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignPage;