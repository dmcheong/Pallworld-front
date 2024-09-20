import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import Alert from '../components/Alert';

const tokensOptions = [
  { quantity: 1, price: 1.99 },
  { quantity: 5, price: 5.99 },
  { quantity: 10, price: 7.99 },
  { quantity: 15, price: 12.99 },
  { quantity: 20, price: 15.99 },
];

function Tokens() {
  const [selectedOption, setSelectedOption] = useState(tokensOptions[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successUrl, setSuccessUrl] = useState('');

  const handleOptionChange = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    const option = tokensOptions.find(opt => opt.quantity === selectedQuantity);
    setSelectedOption(option);
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');

      const items = [
        {
          name: `Pack de ${selectedOption.quantity} Token${selectedOption.quantity > 1 ? 's' : ''}`,
          amount: selectedOption.price * 100,
          quantity: 1,
        },
      ];

      const response = await axios.post('http://localhost:3010/create-checkout-session', {
        items,
        userId,
        success_url: 'http://localhost:3001/success',
        cancel_url: 'http://localhost:3001/cancel',
      });

      setSuccessUrl(response.data.sessionId);

    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement:', error);
      setError('Erreur lors de la création de la session de paiement. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (successUrl) {
    window.location.href = successUrl;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-sky-600">Acheter des tokens</h1>

        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-medium text-gray-700 mb-4 text-center">Sélectionnez un pack de tokens :</label>

          <div className="mt-4">
            <Alert message={error} type="error" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tokensOptions.map((option) => (
              <div key={option.quantity} className={`p-4 border rounded-lg text-center ${selectedOption.quantity === option.quantity ? 'border-sky-600' : 'border-gray-300'}`}>
                <input 
                  type="radio" 
                  id={`token-${option.quantity}`} 
                  name="token" 
                  value={option.quantity} 
                  checked={selectedOption.quantity === option.quantity} 
                  onChange={handleOptionChange} 
                  className="hidden"
                />
                <label htmlFor={`token-${option.quantity}`} className="cursor-pointer">
                  <p className="text-xl font-semibold">{option.quantity} token{option.quantity > 1 ? 's' : ''}</p>
                  <p className="text-gray-600">Prix : {option.price.toFixed(2)}€</p>
                </label>
              </div>
            ))}
          </div>

          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300 w-full"
          >
            {loading ? 'Traitement...' : `Acheter pour ${selectedOption.price.toFixed(2)}€`}
          </button>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Tokens;
