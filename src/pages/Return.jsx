import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ReturnPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const policies = [
    {
      title: 'Produits personnalisés',
      content:
        "Étant donné que nos produits sont fabriqués sur mesure en fonction de vos spécifications, nous ne pouvons pas accepter de retours pour les articles personnalisés. Nous vous encourageons à vérifier toutes les options de personnalisation et à vous assurer que tous les détails sont corrects avant de passer votre commande.",
    },
    {
      title: 'Produits défectueux ou endommagés',
      content:
        "Si vous recevez un produit qui est défectueux ou endommagé, veuillez nous contacter immédiatement. Nous vous demanderons de fournir des preuves de l'état du produit, telles que des photos. Une fois vérifié, nous pourrons vous proposer un échange ou un remboursement complet.",
    },
    {
      title: 'Annulation de commande',
      content:
        "Vous pouvez annuler votre commande tant qu'elle n'a pas été mise en production. Pour annuler une commande, veuillez nous contacter dès que possible. Une fois que la production a commencé, nous ne pourrons plus accepter l'annulation de la commande.",
    },
    {
      title: 'Procédure de retour',
      content:
        "Si vous êtes éligible à un retour (par exemple, pour un produit défectueux ou endommagé), nous vous fournirons des instructions détaillées pour renvoyer l'article. Les frais de retour seront à notre charge dans ces cas. Assurez-vous d'utiliser un service de livraison avec suivi, car nous ne pouvons pas garantir la réception de votre retour sans cela.",
    },
    {
      title: 'Contactez-nous',
      content:
        <>
        'Si vous avez des questions supplémentaires concernant notre politique de retours, n'hésitez pas à nous contacter par email  à support@palworldeshop.com ou via notre{' '}
        <Link to="/support-client" className="text-sky-600 hover:underline">
          formulaire de contact 
        </Link>.
        </>
    },
  ];

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Politique de retours</h1>
          <p className="text-lg sm:text-xl mt-4">Tout ce que vous devez savoir sur notre politique de retours.</p>
        </div>
      </section>

      {/* Return Policy */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Politique de retours et de remboursements</h2>

          <div className="space-y-4">
            {policies.map((policy, index) => (
              <div key={index} className="bg-white shadow rounded-lg">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-xl font-semibold">{policy.title}</h3>
                  <span>
                    {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {policy.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
