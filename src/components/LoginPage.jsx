import axios from "axios";
import { useState } from "react";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "professeur", // Valeur par défaut
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      // Stockage des données utilisateur
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Redirection en fonction du rôle
      if (response.data.user.role === "professeur") {
        navigate("/professor-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="illustration-container">
        <div className="illustration-content">
          <h2>Plateforme de Gestion de Projets</h2>
          <p>Connectez-vous pour accéder à votre espace</p>
        </div>
      </div>

      <div className="form-container">
        <div className="login-card">
          <Link to="/" className="back-button">
            <FiArrowLeft /> Accueil
          </Link>
          
          <div className="card-header">
            <h1>Connexion</h1>
          </div>
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">
                <FiMail className="input-icon" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="input-group">
              <label htmlFor="role">
                <FiUser className="input-icon" /> Rôle
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="professeur">Professeur</option>
                <option value="etudiant">Étudiant</option>
              </select>
            </div>

            <div className="options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Se souvenir de moi
              </label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className="signup-link">
              Pas encore inscrit? <Link to="/register">Créer un compte</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;