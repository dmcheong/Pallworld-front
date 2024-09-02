import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import signupImage from '../assets/pals.jpg';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  return (
    <div>
      <Header />

      <section className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* Left: Image */}
          <div className="md:w-1/2 p-4 hidden md:flex items-center">
            <img 
              src={signupImage} 
              alt="Inscription" 
              className="w-full h-auto max-h-[505px] min-h-[200px] object-cover rounded-lg" 
            />
          </div>

          {/* Right: Signup Form */}
          <div className="md:w-1/2 p-4">
            <SignupForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Signup;
