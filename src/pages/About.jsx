import React , { useRef } from "react";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const About = () => {

const typingRef = useRef(null);
const isInView = useInView(typingRef, { once: false, amount: 0.5 });
      const shopPhotos = [
    {
      id: "1",
      image:
        "https://res.cloudinary.com/dlkmeyasv/image/upload/v1741791171/2_sdoaav.jpg",
      name: "Our Collection",
    },
    {
      id: "2",
      image:
        "https://res.cloudinary.com/dlkmeyasv/image/upload/v1741791170/3_zuo4t3.jpg",
      name: "Store Interior",
    },
    {
      id: "3",
      image:
        "https://res.cloudinary.com/dlkmeyasv/image/upload/v1741791169/1_h76wmv.jpg",
      name: "Vintage Pieces",
    },
    {
      id: "4",
      image:
        "https://res.cloudinary.com/dlkmeyasv/image/upload/v1741791169/6_mkuey8.jpg",
      name: "Community Space",
    },
    {
      id: "5",
      image:
        "https://res.cloudinary.com/dlkmeyasv/image/upload/v1741791169/4_y91yly.jpg",
      name: "Our Store",
    },
    {
      id: "6",
      image:
        "https://res.cloudinary.com/dlkmeyasv/image/upload/v1741791169/5_llwhtn.jpg",
      name: "Featured Items",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={typingRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-sans font-bold text-center text-white mb-6"
          >
            {isInView ? (
              <TypeAnimation
                sequence={[
                  "About us...",
                  2000,
                  "our story...",
                  2000,
                  "& our mission...",
                  2000,
                ]}
                wrapper="span"
                speed={20}
                cursor={true}
                repeat={Infinity}
                style={{ display: "inline-block" }}
                key={isInView ? "typing-visible" : "typing-hidden"}
              />
            ) : (
              <span>About us...</span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 overflow-hidden rounded-lg shadow-lg"
          >
            <div className="flex">
              <Carousel items={shopPhotos} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-6">
                Our Story
              </h2>
              <p className="text-base sm:text-lg mb-6">
                Founded in 2020, Vintage Vault began as a small passion project
                between friends who shared a love for fashion history and
                sustainable clothing. What started as weekend visits to estate
                sales and thrift stores quickly evolved into a curated
                collection of high-quality vintage pieces from across the
                decades.
              </p>

              <p className="text-base sm:text-lg mb-10">
                Today, Vintage Vault is dedicated to preserving the
                craftsmanship and style of bygone eras while promoting
                sustainable fashion practices. Each item in our collection has
                been carefully selected for its quality, condition, and unique
                character.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-6">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg mb-6">
                At Vintage Vault, we believe that fashion should be both
                beautiful and responsible. Our mission is to extend the
                lifecycle of quality garments, reduce waste in the fashion
                industry, and help our customers discover unique pieces that
                tell a story.
              </p>

              <p className="text-base sm:text-lg mb-4">We're committed to:</p>

              <ul className="mb-10 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#feff26] bg-black rounded-full p-1 mr-2 inline-flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>
                    Curating high-quality vintage pieces that stand the test of
                    time
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#feff26] bg-black rounded-full p-1 mr-2 inline-flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>
                    Providing detailed information about each item's history and
                    condition
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#feff26] bg-black rounded-full p-1 mr-2 inline-flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Creating a transparent shopping experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#feff26] bg-black rounded-full p-1 mr-2 inline-flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Promoting sustainable fashion practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#feff26] bg-black rounded-full p-1 mr-2 inline-flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Supporting the circular economy</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-6">
                Our Process
              </h2>
              <p className="text-base sm:text-lg mb-6">
                Every item at Vintage Vault goes through a careful selection and
                preparation process:
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="font-medium">Sourcing:</strong> We source
                    our items from estate sales, vintage collectors, and select
                    thrift stores.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="font-medium">Inspection:</strong> Each
                    piece is thoroughly inspected for quality and condition.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="font-medium">Cleaning:</strong> Items are
                    professionally cleaned using eco-friendly methods.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <strong className="font-medium">Research:</strong> We
                    research each piece to provide accurate era, brand, and
                    material information.
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-6">
                Meet the Team
              </h2>
              <p className="text-base sm:text-lg mb-10">
                Our small but dedicated team brings together expertise in
                fashion history, textiles, retail, and e-commerce. We're united
                by our love for vintage fashion and our commitment to
                sustainable practices.
              </p>

              <div className="my-10 bg-gray-50 p-6 border-l-4 border-black">
                <blockquote className="italic text-xl">
                  "Buy less, choose well, make it last."
                </blockquote>
                <p className="text-right mt-2 font-medium">
                  <TypeAnimation
                    sequence={[
                      "— Vivienne Westwood",
                      2000,
                      "— Vivienne Westwood",
                      2000,
                    ]}
                    wrapper="span"
                    speed={10}
                    cursor={true}
                    repeat={4}
                    style={{ display: "inline-block" }}
                    key={isInView ? "typing-visible" : "typing-hidden"}
                  />
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-6">
                Visit Us
              </h2>
              <p className="text-base sm:text-lg mb-6">
                While we primarily operate online, we occasionally host pop-up
                shops and vintage markets in select cities. Follow us on social
                media to stay updated on our events and new arrivals.
              </p>
              <div className="my-8 flex justify-center w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3086.380933705936!2d-15.425345429567809!3d28.09720516775024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40959472d9d73d%3A0x1b93980aa08d5745!2sC%2F%20Fama%2C%2030%2C%2035015%20Las%20Palmas%20de%20Gran%20Canaria%2C%20Las%20Palmas!5e1!3m2!1sen!2ses!4v1741861552283!5m2!1sen!2ses"
                  width="70%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6"
          >
            Ready to Discover Unique Vintage Pieces?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-[220px]">
              <Link to="/shop" className="block w-full">
                <a
                  href="#_"
                  className="relative inline-block text-lg group w-full"
                >
                  <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-56 h-64 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
                    <span className="relative">Shop Now</span>
                  </span>
                  <span
                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
                    data-rounded="rounded-lg"
                  ></span>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
