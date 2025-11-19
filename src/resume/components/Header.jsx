// src/components/Header.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = ({ onExport }) => {
 

  return (
    <motion.header
      className=""
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 120,
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Navbar></Navbar>
  
       
      </div>

      {/* Mobile Menu */}
     
    </motion.header>
  );
};

export default Header;
