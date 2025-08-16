import React from "react";
import "./Modal.css";
import Stash from "./Stash";

export default function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-fullscreen">
        <button className="modal-close" onClick={onClose}>✖</button>
        <Stash />
      </div>
    </div>
  );
}