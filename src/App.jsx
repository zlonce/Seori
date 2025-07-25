import React from "react";
import logo from "./assets/logo.svg";
import Calculator from "./Calculator/Calculator";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="navi">
        <img className="logo" src={logo} alt="로고" />
        <div className="menu">☰</div>
      </nav>

      <div className="main-container">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
