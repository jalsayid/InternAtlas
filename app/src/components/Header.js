import React from "react";
import "../App.css";

export default function Header({ title }) {
  return (
    <div className="text-center m-5">
      <h1 className="h1-joud">{title}</h1>
    </div>
  );
}
