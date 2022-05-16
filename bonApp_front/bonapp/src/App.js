import React from "react";
import logo from "./assets/img/TNS_Logo_3_TSP.jpg";
import {Routes, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mon Projet BonApp TNS</h1>
        <img src={logo} className="tns-logo" alt="TNS logo" />
      </header>
    </div>
  );
}

export default App;
