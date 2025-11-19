import React from "react";
import Header from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import ContactSection from "./ContactSection";
import CSRShowcase from "./CSRShowcase";

export default function CSRSectionEnhanced() {
  return (
    <>
      {/* HEADER - No margin, no padding */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* MAIN CONTENT - Perfectly aligned */}
      <main className="overflow-hidden">

        {/* CSR Showcase - No extra spacing above */}
        <div className="mt-3 pt-2">
          <CSRShowcase />
        </div>

        {/* Contact Section - Unified spacing */}
        <div className="mt-0">
          <ContactSection />
        </div>

      </main>

      {/* FOOTER - clean attach */}
      <Footer />
    </>
  );
}
