import React from "react";
import Layout from "../layouts/Layout";
import ServiceHeroSections from "../components/ServiceHeroSection2";
import ServiceProvided from "../components/ServiceProvided";
import ContactWhatsApp from "../components/ContactWhatsApp";

const Service = () => {
  return (
    <div className="relative"> {/* FIX */}
      <Layout>
        <div className="relative max-w-[100%] mx-auto"> {/* FIX */}
          <ServiceHeroSections />
          <ServiceProvided />
          <ContactWhatsApp />
        </div>
      </Layout>
    </div>
  );
};

export default Service;