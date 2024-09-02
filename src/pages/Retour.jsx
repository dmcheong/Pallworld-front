import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReturnPolicy = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Politique de Retours</h1>
          <p className="text-lg sm:text-xl mt-4">Tout ce que vous devez savoir sur notre politique de retours.</p>
        </div>
      </section>

      {/* Return Policy Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Politique de Retours et de Remboursements</h2>

          <div className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">1. Produits Personnalisés</h3>
              <p className="text-gray-700 leading-relaxed">
                Étant donné que nos produits sont fabriqués sur mesure en fonction de vos spécifications, nous ne pouvons pas accepter de retours pour les articles personnalisés. Nous vous encourageons à vérifier toutes les options de personnalisation et à vous assurer que tous les détails sont corrects avant de passer votre commande.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">2. Produits Défectueux ou Endommagés</h3>
              <p className="text-gray-700 leading-relaxed">
                Si vous recevez un produit qui est défectueux ou endommagé, veuillez nous contacter immédiatement. Nous vous demanderons de fournir des preuves de l'état du produit, telles que des photos. Une fois vérifié, nous pourrons vous proposer un échange ou un remboursement complet.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">3. Annulation de Commande</h3>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez annuler votre commande tant qu'elle n'a pas été mise en production. Pour annuler une commande, veuillez nous contacter dès que possible. Une fois que la production a commencé, nous ne pourrons plus accepter l'annulation de la commande.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">4. Procédure de Retour</h3>
              <p className="text-gray-700 leading-relaxed">
                Si vous êtes éligible à un retour (par exemple, pour un produit défectueux ou endommagé), nous vous fournirons des instructions détaillées pour renvoyer l'article. Les frais de retour seront à notre charge dans ces cas. Assurez-vous d'utiliser un service de livraison avec suivi, car nous ne pouvons pas garantir la réception de votre retour sans cela.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">5. Contactez-nous</h3>
              <p className="text-gray-700 leading-relaxed">
                Si vous avez des questions supplémentaires concernant notre politique de retours, n'hésitez pas à nous contacter via notre formulaire de contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
