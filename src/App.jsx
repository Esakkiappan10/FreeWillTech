// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <Router>
      <AnimatedRoutes transitionDuration={1100} />
    </Router>
  );
}

export default App;
