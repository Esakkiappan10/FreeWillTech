import React from 'react'
import Layout from '../layouts/Layout'
import ContactCards from '../components/ContactCards'
import ContactSection from '../components/ContactSection'
import ContactWhatsApp from '../components/ContactWhatsApp'

const Contact = () => {
  return (
    <div>
      <Layout>
        <div>
          <ContactCards />
          <ContactSection />
          <ContactWhatsApp />
        </div>
      </Layout>
    </div>
  )
}

export default Contact