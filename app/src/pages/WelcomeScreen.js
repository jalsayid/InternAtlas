import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [animationKey, setAnimationKey] = useState(0); // forces re-render for animation

  useEffect(() => {
    
    const username = sessionStorage.getItem('loggedInUser');
    const userType = sessionStorage.getItem('userType');

    let msg = "Welcome 👋";
    if (userType === 'student') {
      msg = `Hello, ${username} 👋 Your future starts here`;
    } else if (userType === 'admin') {
      msg = `Hello, ${username} 👋 Time to oversee the platform`;
    } else if (userType === 'company') {
      msg = `Hello, ${username} 👋 Let’s discover new talent`;
    }

    setMessage(msg);
    setAnimationKey(prev => prev + 1); // retrigger animation when message changes

    const timer = setTimeout(() => {
      if (userType === 'admin') navigate('/dashboard/admin');
      else if (userType === 'company') navigate('/dashboard/company');
      else navigate('/dashboard/student');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="logo-drop">
        <img src="/imgs/logo.png" alt="InternAtlas Logo" className="logo" />
      </div>

      {/* Add key to force animation restart */}
      {message && (
        <h2
          key={animationKey}
          className="typing-effect"
          style={{ width: `${message.length + 1}ch` }}
        >
          {message}
        </h2>
      )}
    </div>
  );
}
