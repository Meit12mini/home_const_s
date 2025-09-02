
import React from 'react';
import Button from './ui/Button';

interface HeroProps {
  onScrollToConstructor: () => void;
}

const Contact: React.FC<HeroProps> = ({ onScrollToConstructor }) => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark">Готовы сделать первый шаг к своему дому?</h2>
            <p className="mt-4 text-lg text-gray-600">Это бесплатно и ни к чему вас не обязывает. Просто посмотрите,
какой дом у вас может быть.</p>
        </div>
        <div className='flex justify-center'>
                <Button onClick={() => {
    onScrollToConstructor(); // ваша существующая функция
  }} as="a" variant="primary" size="lg">Собрать дом и получить смету</Button>
            </div>
       
      </div>
    </section>
  );
};

export default Contact;