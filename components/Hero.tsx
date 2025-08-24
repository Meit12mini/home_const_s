import React from 'react';
import Button from './ui/Button';

interface HeroProps {
  onScrollToConstructor: () => void;
}

// Icons for the benefit cards
const CalculatorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-brand-gold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M12 17h.01M15 17h.01M9 10h.01M12 10h.01M15 10h.01M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
);

const CustomizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-brand-gold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-brand-gold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.917L12 22l9-1.083A12.02 12.02 0 0021 5.984a11.955 11.955 0 01-5.382-4.016z" />
    </svg>
);


const BenefitCard = ({ icon, title, description, onClick }: { icon: React.ReactNode; title: string; description: string; onClick: () => void; }) => (
    <button onClick={onClick} className="bg-black/40 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-black/60 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-4 focus:ring-offset-brand-dark w-full">
        {icon}
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </button>
);


const Hero: React.FC<HeroProps> = ({ onScrollToConstructor }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-dark text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1581888224145-c206981fec70?q=80&w=1920&auto=format&fit=crop"
        alt="Милый мопс отдыхает на диване в уютном доме"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            Постройте дом по вашим правилам
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8 drop-shadow-md mx-auto">
            Наш онлайн-конструктор — это полный контроль над проектом и ценой. Прозрачно, удобно и без сюрпризов.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <BenefitCard
                  onClick={onScrollToConstructor}
                  icon={<CalculatorIcon />}
                  title="Точная цена сразу"
                  description="Соберите комплектацию и мгновенно увидьте итоговую стоимость."
              />
              <BenefitCard
                  onClick={onScrollToConstructor}
                  icon={<CustomizeIcon />}
                  title="Полная кастомизация"
                  description="Выбирайте материалы фасада, кровли, окон и добавляйте опции."
              />
              <BenefitCard
                  onClick={onScrollToConstructor}
                  icon={<ShieldIcon />}
                  title="Фиксированная смета"
                  description="Цена в конструкторе = цена в договоре. Никаких скрытых платежей."
              />
          </div>

          <Button onClick={onScrollToConstructor} variant="primary" size="lg">
            Начать сборку
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;