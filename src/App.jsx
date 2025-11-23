// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <div className="relative min-h-screen">  {/* FINAL FIX */}
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
