import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../WelcomeScreen.css'; // Custom styles for animation

export default function WelcomeScreen({ userName = "User" }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/student"); // Adjust the route as needed
    }, 5000); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="logo-drop">
        <img src="/logo.png" alt="InternAtlas Logo" className="logo" />
      </div>
      <h2 className="fade-in">Welcome, {userName} 👋</h2>
      <p className="typing-text">Your future starts here.</p>
    </div>
  );
}
