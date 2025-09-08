import React from 'react';
import Button from './ui/Button';

interface HeroProps {
  onScrollToConstructor: () => void;
}






const Hero: React.FC<HeroProps> = ({ onScrollToConstructor }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-dark text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      
      <img
        src="/img/heroimg.webp"
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 w-full">
        <div className="max-w-5xl mx-auto text-center mb-2.5 sm:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
           Строительство каркасных домов в Чите.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-24 drop-shadow-md mx-auto">
          От 38 000 руб/м². Срок — 4 месяца. Гарантия
по договору.
          </p>

         
<Button 
  onClick={() => {
    window.location.hash = 'constructor';
    onScrollToConstructor(); // ваша существующая функция
 
  }}
  variant="primary" 
  size="lg">
           Рассчитать точную стоимость
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;