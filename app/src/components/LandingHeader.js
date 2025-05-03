import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/internatlas-logo.png"; 
import { PersonCircle } from "react-bootstrap-icons";
import './../LandingHeader.css';

export default function LandingHeader() {
    const navigate = useNavigate();

    const handleLogin = () => navigate("/login");

    return (
        <nav
            className="d-flex justify-content-between align-items-center shadow-sm px-4 py-2 bg-white"
            style={{
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
            }}
        >
            {/* Left: Login Button */}
            <button className="btn btn-outline-dark fw-semibold px-3" onClick={handleLogin}>
                Login
            </button>

            {/* Center: Logo */}
            <div className="logo-wrapper">
            <img src={logo} alt="InternAtlas" className="logo-img" />
            
            </div>


            {/* Right: User Info */}
            <div className="d-flex align-items-center gap-2">
            <PersonCircle size={24} />
                
                <span className="fw-semibold text-dark">Hello, Guest</span>
            </div>
        </nav>
    );
}
