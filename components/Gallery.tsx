import React from 'react';

const galleryImages = [
  { id: 1, src: '/img/Наши работы/image_2025-09-03_11-37-01.webp', alt: 'Современный дом с панорамными окнами в лесу' },
  { id: 2, src: '/img/Наши работы/image_2025-09-03_11-37-41.webp', alt: 'Светлая кухня-гостиная с выходом на террасу' },
    { id: 3, src: '/img/Наши работы/22_Built_1739349754_3002.webp', alt: 'Уютная терраса загородного дома с деревянной мебелью' },
    { id: 4, src: '/img/Наши работы/image_2025-09-03_11-39-03.webp', alt: 'Фасад дома с отделкой из планкена и камня' },
    { id: 5, src: '/img/Наши работы/image_2025-09-03_11-40-01.webp', alt: 'Интерьер спальни в скандинавском стиле' },
    { id: 6, src: '/img/Наши работы/image_2025-09-03_11-40-53.webp', alt: 'Дом на участке с ландшафтным дизайном' },
];

const Gallery: React.FC = () => {
  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark">Готовые работы</h2>
            <p className="mt-4 text-lg text-gray-600">Посмотрите на дома, в которых уже живут счастливые семьи.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map(image => (
                <div key={image.id} className="group aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg">
                    <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;