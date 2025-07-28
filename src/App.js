import React from 'react';
import { Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignPage from './components/SignPage';
import Home from "./components/Home";
// import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignPage />} />
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}

          {/* Protected Routes - Wrapped with Layout */}
          {/* <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Route> */}

          {/* 404 Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;