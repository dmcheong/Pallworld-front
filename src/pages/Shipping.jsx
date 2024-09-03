import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Support from '../components/Support';

const Shipping = () => {
  const shippingInfo = [
    {
      question: 'Options de livraison',
      answer: (
        <ul className="list-disc list-inside">
          <li><strong>Livraison Standard</strong> - Livraison en 5 à 7 jours ouvrables.</li>
          <li><strong>Livraison Express</strong> - Livraison en 2 à 3 jours ouvrables.</li>
          <li><strong>Livraison Internationale</strong> - Livraison disponible dans la plupart des pays, délais variables selon la destination.</li>
        </ul>
      ),
    },
    {
      question: 'Frais de livraison',
      answer:
        "Les frais de livraison sont calculés en fonction de votre localisation et de l'option de livraison choisie. Les frais exacts seront affichés lors de la validation de votre commande avant le paiement. Nous offrons la livraison gratuite pour les commandes supérieures à un certain montant. Consultez notre site régulièrement pour les promotions et offres spéciales.",
    },
    {
      question: 'Délais de livraison',
      answer:
        "Les délais de livraison peuvent varier en fonction de votre emplacement et de l'option de livraison sélectionnée. Veuillez noter que les délais de livraison sont estimés et peuvent être affectés par des facteurs hors de notre contrôle, tels que les conditions météorologiques ou les retards douaniers pour les expéditions internationales. Nous nous efforçons de traiter et d'expédier toutes les commandes dans les 1 à 2 jours ouvrables suivant leur réception.",
    },
    {
      question: 'Suivi de commande',
      answer:
        "Une fois votre commande expédiée, vous recevrez un email contenant les informations de suivi. Vous pouvez utiliser ce lien pour suivre la progression de votre livraison. Si vous rencontrez des problèmes avec le suivi ou la réception de votre commande, veuillez contacter notre support client.",
    },
    {
      question: 'Informations complémentaires',
      answer: (
        <>
          Si vous avez des questions supplémentaires concernant la livraison, n'hésitez pas à nous contacter par email à support@palworldeshop.com ou via notre{' '}
          <a href="/support-client" className="text-sky-600 hover:underline">
            formulaire de contact
          </a>.
        </>
      ),
    },
  ];

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Informations de livraison</h1>
          <p className="text-lg sm:text-xl mt-4">Tout ce que vous devez savoir sur nos options de livraison.</p>
        </div>
      </section>

      {/* Shipping Information */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Options et détails de Livraison</h2>

          <Support questions={shippingInfo} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shipping;
