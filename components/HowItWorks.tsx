
import React from 'react';

const Step = ({ number, title, description }: { number: string; title: string; description: string; }) => (
    <div className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-brand-gold text-white text-2xl font-bold rounded-full shadow-lg">
            {number}
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark">Как это работает?</h2>
            <p className="mt-4 text-lg text-gray-600">Всего 3 простых шага до дома вашей мечты</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <Step number="1" title="Выберите проект" description="Ознакомьтесь с нашими типовыми проектами и выберите тот, что подходит вашей семье." />
            <Step number="2" title="Соберите комплектацию" description="Используйте наш интерактивный конструктор, чтобы выбрать отделку и опции." />
            <Step number="3" title="Получите смету" description="Мгновенно увидьте итоговую стоимость и отправьте заявку на получение подробной сметы." />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
