import React from "react";
import Layout from "../layouts/Layout";
import ServiceHeader from "../components/ServiceHeader";
import { serviceImage, serviceImage2 } from "../assets/image";
import ServiceHeroSections from "../components/ServiceHeroSection2";
import ServiceProvided from "../components/ServiceProvided";
import ContactWhatsApp from "../components/ContactWhatsApp";

const Service = () => {
  return (
    <div>
      <Layout>
        <div className="max-w-[100%] mx-auto">      
          <ServiceHeroSections></ServiceHeroSections>
          <ServiceProvided></ServiceProvided>
          <ContactWhatsApp></ContactWhatsApp>
        </div>
      </Layout>
    </div>
  );
};

export default Service;
