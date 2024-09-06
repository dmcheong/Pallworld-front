import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import TextArea from '../components/TextArea';
import FormButton from '../components/FormButton';
import Alert from '../components/Alert'; // Si tu utilises les alertes pour afficher le succès ou l'échec

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
  });

  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      reason: formData.reason,
      message: formData.message,
    };

    emailjs.send('service_68ok77b', 'template_d8nkxkh', templateParams, 'mlASFtAACngdRLXlp')
      .then((response) => {
        console.log('Email envoyé avec succès!', response.status, response.text);
        setAlert({ message: 'Message envoyé avec succès', type: 'success' });
        // Réinitialiser le formulaire si besoin
        setFormData({ name: '', email: '', reason: '', message: '' });
      }, (err) => {
        console.error('Erreur lors de l\'envoi du message:', err);
        setAlert({ message: 'Erreur lors de l\'envoi du message', type: 'error' });
      });
  };

  const reasons = [
    { value: 'commande', label: 'Problème avec une commande' },
    { value: 'produit', label: 'Question sur un produit' },
    { value: 'compte', label: 'Problème de compte' },
    { value: 'autre', label: 'Autre' },
  ];

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Support client</h1>
          <p className="text-lg sm:text-xl mt-4">Nous sommes là pour vous aider.</p>
        </div>
      </section>

      {/* Support Form */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Contactez-nous</h2>

          <Alert message={alert.message} type={alert.type} /> {/* Affiche l'alerte */}

          <div className="flex flex-col lg:flex-row lg:space-x-16">
            {/* Contact Information */}
            <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-8 mb-8 lg:mb-0">
              <h3 className="text-xl font-semibold mb-4">Informations de contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaEnvelope className="text-sky-600 mr-3" />
                  <span>palworldeshop@gmail.com</span>
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

              {/* Google Maps Integration */}
              <div className="mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9995268328054!2d2.1938787156751653!3d48.891223579290246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6652ef4a51853%3A0x5b3ad4f2436e55f6!2s12%20Rue%20Anatole%20France%2C%2092000%20Nanterre%2C%20France!5e0!3m2!1sen!2sfr!4v1631536726785!5m2!1sen!2sfr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:w-2/3">
              <form className="bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
                <TextInput
                  label="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
                <SelectInput
                  label="Motif"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  options={reasons.map(reason => reason.label)}
                  required
                />
                <TextArea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <div className="flex justify-center">
                  <FormButton text="Envoyer" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
