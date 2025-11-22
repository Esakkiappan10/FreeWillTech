// Home.jsx
import React from "react";
import Header from "./Header";
import AboutCompany from "./AboutCompany";
import Offer from "../components/Offer"; // Note: You had this in specific folders, adjust path if needed
import GetInTouch from "../components/GetInTouch"; 
import Layout from "../layouts/Layout"; // Keep your layout wrapper

const Home = () => {
  return (
    <Layout>
      {/* Global smooth background for the premium feel */}
      <main className="relative w-full bg-slate-50 overflow-hidden selection:bg-[#FE861B] selection:text-white">
        
        <Header />
        
        {/* Section Dividers or Flow logic can be added here */}
        <div className="relative z-10 space-y-0"> 
          <AboutCompany />
          <Offer />
          <GetInTouch />
        </div>

      </main>
    </Layout>
  );
};

export default Home;