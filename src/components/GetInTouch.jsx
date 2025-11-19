import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const { name, email, phone, service, message } = formData;

  const mailto = `mailto:contact@freewilltech.in?subject=${encodeURIComponent(
    "New Inquiry from " + name
  )}&body=${encodeURIComponent(
    `Name: ${name}
Email: ${email}
Phone: ${phone}
Service Required: ${service}

Message:
${message}`
  )}`;

  window.location.href = mailto;
};


  return (
    <section className="relative w-full font-[Nunito] py-20 lg:py-28 px-[5%] overflow-hidden">

      {/* Ambient Glow Left */}
      <div className="absolute -left-10 top-20 w-[300px] h-[300px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Ambient Glow Right */}
      <div className="absolute -right-10 bottom-10 w-[320px] h-[320px] bg-secondary/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch z-[5]">

        {/* LEFT — CONTACT CARD (Premium Glass Section) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-xl bg-black/20 backdrop-blur-2xl border border-white/10 flex flex-col justify-end"
        >
          {/* Background */}
          <img
            src="/aboutus.jpg"
            alt="freewill bg"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.35]"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/80" />

          {/* Foreground Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-white p-10 lg:p-12 flex flex-col space-y-10"
          >
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-secondary" size={30} />
                <div>
                  <h3 className="text-xl font-bold">Email Us</h3>
                  <p className="text-gray-200 text-sm sm:text-base">
                    contact@freewilltech.in
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-secondary" size={30} />
                <div>
                  <h3 className="text-xl font-bold">Call Us</h3>
                  <p className="text-gray-200 text-sm sm:text-base">
                    +91 96268 06328
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <motion.a
              href="https://wa.me/919626806328"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="inline-block border-2 border-white py-3 px-6 rounded-xl font-semibold hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg w-fit"
            >
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — CONTACT FORM (Animated, Premium Inputs) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100"
        >
          <p className="text-primary font-semibold tracking-wide mb-2">
            CONTACT US
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark leading-snug mb-4">
            Let’s Build Something Great Together
          </h2>

          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Share your ideas with us — we’ll respond quickly and help you get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                placeholder="Your Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-primary-dark outline-none transition-all"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                placeholder="name@example.com *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-primary-dark outline-none transition-all"
              />
            </div>

            {/* Phone + Dropdown */}
            <div className="grid sm:grid-cols-2 gap-5">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                name="phone"
                placeholder="+91 xxxxxxxxxx *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-primary-dark outline-none transition-all"
              />

              <motion.select
                whileFocus={{ scale: 1.02 }}
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-500 text-sm focus:ring-2 focus:ring-primary-dark outline-none transition-all"
              >
                <option value="" disabled>Select a Service *</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="IT Solutions">IT Solutions</option>
              </motion.select>
            </div>

            {/* Message */}
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              name="message"
              placeholder="Tell us about your idea or need *"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg h-32 text-sm focus:ring-2 focus:ring-primary-dark outline-none transition-all"
            />

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.92 }}
              className="w-full bg-primary-dark text-white py-3 sm:py-4 rounded-lg font-bold hover:bg-secondary transition-all duration-300 shadow-lg"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
