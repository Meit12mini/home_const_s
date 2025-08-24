
import React from 'react';
import Button from './ui/Button';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark">Остались вопросы?</h2>
            <p className="mt-4 text-lg text-gray-600">Свяжитесь с нами, и мы с радостью проконсультируем вас по всем деталям.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-brand-dark">Наш офис в Чите</h3>
                <p className="text-gray-600 mt-2">Чита, ул. Трактовая, 7а, офис 21</p>
                <a href="tel:+79145216931" className="block text-3xl font-extrabold text-brand-blue mt-4 hover:text-blue-900 transition-colors">
                    +7 (914) 521-69-31
                </a>
                 <p className="text-gray-500 mt-1">Звоните или пишите в WhatsApp/Telegram</p>
            </div>
            <div>
                <Button href="tel:+79145216931" as="a" variant="primary" size="lg">Позвонить менеджеру</Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;