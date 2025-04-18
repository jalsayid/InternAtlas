import React from "react";
import { useNavigate } from 'react-router-dom';




export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      className="d-flex justify-content-between align-items-center shadow-lg p-3 bg-white"
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <button className="second-btn" onClick={() => navigate('/dashboard/student')}>Dashboard</button>
      <div className="d-flex align-items-center gap-2">
        <img
          src="/imgs/userIcon.svg"
          alt="User Icon"
          style={{ width: "30px", height: "30px" }}
        />
        <p className="m-0">Hello, sabic</p>
      </div>
    </nav>
  );
}
