import React from "react";
import { useNavigate } from 'react-router-dom';

export default function LandingHeader() {
    const navigate = useNavigate();
    const handleLogin = () => navigate("/login")
    return (
        <nav
            className="d-flex justify-content-between shadow-lg p-3 bg-white"
            style={{
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
            }}
        >
            <button className="second-btn" onClick={handleLogin}>Lonin</button>
            <div className="d-flex align-items-center gap-2">
                <img
                    src="/userIcon.svg"
                    alt="User Icon"
                    style={{ width: "30px", height: "30px" }}
                />
                <p className="m-0">Hello, guest</p>
            </div>

            <br/>
        </nav>
    );
}
