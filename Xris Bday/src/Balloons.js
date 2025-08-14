import React from "react";
import "./Balloons.css";

export default function Balloons() {
  return (
    <div className="balloons-container">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="balloon" style={{ left: `${i * 10}%` }} />
      ))}
    </div>
  );
}