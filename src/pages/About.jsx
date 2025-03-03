import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-center text-amber-900 mb-8">
          About Vintage Vault
        </h1>

        <div className="mb-12 overflow-hidden rounded-lg">
          <img
            src="https://via.placeholder.com/1200x600"
            alt="Vintage store interior"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="prose prose-amber lg:prose-lg max-w-none">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Vintage Vault began as a small passion project
            between friends who shared a love for fashion history and
            sustainable clothing. What started as weekend visits to estate sales
            and thrift stores quickly evolved into a curated collection of
            high-quality vintage pieces from across the decades.
          </p>

          <p>
            Today, Vintage Vault is dedicated to preserving the craftsmanship
            and style of bygone eras while promoting sustainable fashion
            practices. Each item in our collection has been carefully selected
            for its quality, condition, and unique character.
          </p>

          <h2 className="mt-8">Our Mission</h2>
          <p>
            At Vintage Vault, we believe that fashion should be both beautiful
            and responsible. Our mission is to extend the lifecycle of quality
            garments, reduce waste in the fashion industry, and help our
            customers discover unique pieces that tell a story.
          </p>

          <p>We're committed to:</p>

          <ul>
            <li>
              Curating high-quality vintage pieces that stand the test of time
            </li>
            <li>
              Providing detailed information about each item's history and
              condition
            </li>
            <li>Creating a transparent shopping experience</li>
            <li>Promoting sustainable fashion practices</li>
            <li>Supporting the circular economy</li>
          </ul>

          <h2 className="mt-8">Our Process</h2>
          <p>
            Every item at Vintage Vault goes through a careful selection and
            preparation process:
          </p>

          <ol>
            <li>
              <strong>Sourcing:</strong> We source our items from estate sales,
              vintage collectors, and select thrift stores.
            </li>
            <li>
              <strong>Inspection:</strong> Each piece is thoroughly inspected
              for quality and condition.
            </li>
            <li>
              <strong>Cleaning:</strong> Items are professionally cleaned using
              eco-friendly methods.
            </li>
            <li>
              <strong>Research:</strong> We research each piece to provide
              accurate era, brand, and material information.
            </li>
            <li>
              <strong>Photography:</strong> Items are photographed to showcase
              their true color, texture, and condition.
            </li>
            <li>
              <strong>Listing:</strong> Detailed descriptions are created to
              help you make informed decisions.
            </li>
          </ol>

          <h2 className="mt-8">Meet the Team</h2>
          <p>
            Our small but dedicated team brings together expertise in fashion
            history, textiles, retail, and e-commerce. We're united by our love
            for vintage fashion and our commitment to sustainable practices.
          </p>

          <div className="mt-8 mb-8">
            <blockquote className="italic border-l-4 border-amber-500 pl-4 py-2">
              "Fashion fades, only style remains the same." — Coco Chanel
            </blockquote>
          </div>

          <h2>Visit Us</h2>
          <p>
            While we primarily operate online, we occasionally host pop-up shops
            and vintage markets in select cities. Follow us on social media to
            stay updated on our events and new arrivals.
          </p>

          <p className="mt-8">
            Thank you for supporting sustainable fashion and for being part of
            the Vintage Vault community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
