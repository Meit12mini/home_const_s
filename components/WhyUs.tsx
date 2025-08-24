
import React from 'react';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Advantage = ({ title, description }: { title: string; description: string }) => (
    <div className="flex items-start space-x-4">
        <div>
            <CheckIcon />
        </div>
        <div>
            <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);


const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark">Почему нам доверяют</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Мы строим надежные дома для счастливой жизни, гарантируя прозрачность на каждом этапе.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
            <Advantage title="Фиксированная цена" description="Стоимость, рассчитанная в конструкторе, фиксируется в договоре и не меняется." />
            <Advantage title="Гарантия 2 года" description="Мы уверены в качестве наших домов и даем официальную гарантию на все работы." />
            <Advantage title="Срок строительства 4 месяца" description="Соблюдаем сроки благодаря отлаженным процессам и собственной производственной базе." />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
