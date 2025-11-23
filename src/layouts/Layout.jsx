import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative">  {/* FIX */}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
