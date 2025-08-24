
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-8 text-center">
        <p>&copy; 2022 Тектоника. Все права защищены.</p>
        <p className="text-sm text-gray-400 mt-2">Строительство каркасных домов в г. Чита.</p>
      </div>
    </footer>
  );
};

export default Footer;