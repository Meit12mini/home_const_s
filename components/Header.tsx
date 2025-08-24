
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <a href="#" className="text-2xl font-extrabold text-brand-dark text-center sm:text-left">
          Тектоника
        </a>
        <div className="text-center sm:text-right">
            <a href="tel:+79145216931" className="text-lg font-bold text-brand-blue hover:text-blue-900 transition-colors">
                +7 (914) 521-69-31
            </a>
            <p className="text-sm text-gray-500">Чита, ул. Трактовая, 7а, офис 21</p>
        </div>
      </div>
    </header>
  );
};

export default Header;