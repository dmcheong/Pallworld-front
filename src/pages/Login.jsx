import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import loginImage from '../assets/pals.jpg';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <Header />

      <section className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* Left: Image */}
          <div className="md:w-1/2 p-4 hidden md:flex items-center">
            <img 
              src={loginImage} 
              alt="Connexion" 
              className="w-full h-auto max-h-[415px] min-h-[200px] object-cover rounded-lg" 
            />
          </div>

          {/* Right: Login Form */}
          <div className="md:w-1/2 p-4">
            <LoginForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
