import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../WelcomeScreen.css'; 

export default function WelcomeScreen({ userName = "Student" }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/student");
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="logo-drop">
        <img src="/imgs/logo.png" alt="InternAtlas Logo" className="logo" />
      </div>
      <h2 className="fade-in">Welcome, {userName} 👋</h2>
      <p className="typing-text">Your future starts here.</p>
    </div>
  );
}
