import React from 'react';
import Layout from '../layouts/Layout';
import ServiceHeroSection from '../components/ServiceHeroSection';
import Mission from '../components/Mission';

const About = () => {
  return (
    <Layout>
      <main className="w-full bg-slate-50 overflow-hidden selection:bg-[#FE861B] selection:text-white">
        
        {/* 1. Intro Hero ("Who We Are" - About) */}
        <ServiceHeroSection />

        {/* 2. Comprehensive Section ("Mission, Vision, Values, Principles") */}
        <Mission/>

      </main>
    </Layout>
  );
};

export default About;