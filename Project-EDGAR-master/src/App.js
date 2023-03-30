import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//imports for Navigation
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Tutorial from "./components/Tutorial";
//imports for routes
import { Route, Routes } from "react-router-dom"

function App() {
    return (
      <div className="landing">
        <header>
          <Navbar/>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Tutorial" element={<Tutorial />} />
          
        </Routes>
        </header>
      </div>
    )
  }


export default App
