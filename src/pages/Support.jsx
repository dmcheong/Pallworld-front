import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupportForm from '../components/SupportForm';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const SupportClient = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Support Client</h1>
          <p className="text-lg sm:text-xl mt-4">Nous sommes là pour vous aider.</p>
        </div>
      </section>

      {/* Support Form Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Contactez-nous</h2>

          <div className="flex flex-col lg:flex-row lg:space-x-16">
            {/* Contact Information */}
            <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-8 mb-8 lg:mb-0">
              <h3 className="text-xl font-semibold mb-4">Informations de Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaEnvelope className="text-sky-600 mr-3" />
                  <span>support@palworldeshop.com</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="text-sky-600 mr-3" />
                  <span>+33 1 48 07 07 02</span>
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt className="text-sky-600 mr-3" />
                  <span>12 Rue Anatole France, 92000 Nanterre, France</span>
                </li>
              </ul>
            </div>

            {/* Support Form */}
            <div className="lg:w-2/3">
              <SupportForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SupportClient;
