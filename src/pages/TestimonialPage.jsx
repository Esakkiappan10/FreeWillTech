import React from "react";
import Header from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import TestimonialsSection from "./TestimonialsSection";
import ContactWhatsapp from "../components/ContactWhatsApp";

export default function TestimonialsPage() {
  return (
    <>
      <Header />

      {/* Page Wrapper */}
      <div className="pt-6">
        <TestimonialsSection/>
      </div>
      <ContactWhatsapp />

      <Footer />
    </>
  );
}
