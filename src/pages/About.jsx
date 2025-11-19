import React from 'react'
import Layout from '../layouts/Layout'
import AboutHeader from '../components/AboutHeader'
import ContactWhatsApp from '../components/ContactWhatsApp'
import ServiceHeroSection from '../components/ServiceHeroSection'
import Faq from '../components/Faq'
import CSRSection from '../components/csr'

const About = () => {
  return (
    <div>
      <Layout>
        <div>
          <ServiceHeroSection></ServiceHeroSection>
          <Faq></Faq>
          <ContactWhatsApp></ContactWhatsApp>
        </div>
      </Layout>
    </div>
  )
}

export default About