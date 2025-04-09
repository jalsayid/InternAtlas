import React from "react";

export default function Navbar() {
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
      <button className="second-btn">Dashboard</button>
      <div className="d-flex align-items-center gap-2">
        <img
          src="/userIcon.svg"
          alt="User Icon"
          style={{ width: "30px", height: "30px" }}
        />
        <p className="m-0">Hello, sabic</p>
      </div>
    </nav>
  );
}
