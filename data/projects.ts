import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'optima-80',
    name: 'Оптима 80',
    area: 80,
    bedrooms: 2,
    images: [
    
      '/img/Оптима/image_2025-08-24_16-43-24.webp',
      '/img/Оптима/image_2025-08-24_16-43-56.webp',
      '/img/Оптима/image_2025-08-24_16-44-41.webp',
      '/img/Оптима/image_2025-08-24_16-45-04.webp',
    ],
    configurationLevels: [
      { id: 'box', name: 'Коробка', priceModifier: 2500000, description: 'Фундамент, стены и кровля. Основа вашего будущего дома, готовая к дальнейшей отделке.' },
      { id: 'komfort', name: 'Комфорт', priceModifier: 3500000, description: "Включает 'Коробку', утепление, окна, входную дверь и внешнюю отделку. Стены готовы под чистовую отделку." },
      { id: 'turnkey', name: 'Под ключ', priceModifier: 4800000, description: "Полностью готовый дом: комплектация 'Комфорт' плюс внутренняя отделка, электрика, сантехника и отопление." },
    ],
    facadeOptions: [
      { id: 'vinyl-siding', name: 'Сайдинг виниловый', priceModifier: 0, description: 'Базовая опция' },
      { id: 'metal-siding', name: 'Металлосайдинг', priceModifier: 150000 },
      { id: 'planken', name: 'Планкен', priceModifier: 400000 },
    ],
    roofOptions: [
      { id: 'metal-tile', name: 'Металлочерепица', priceModifier: 0, description: 'Базовая опция' },
      { id: 'flexible-tile', name: 'Гибкая черепица', priceModifier: 120000 },
    ],
    windowOptions: [
      { id: 'white', name: 'Белые', priceModifier: 0, description: 'Базовая опция' },
      { id: 'laminated', name: 'Ламинированные', priceModifier: 80000 },
    ],
    addons: [
      { id: 'terrace', name: 'Терраса 15 м²', priceModifier: 200000, checked: false },
      { id: 'carport', name: 'Навес для авто', priceModifier: 220000, checked: false },
    ],
  },
  {
    id: 'prostor-125',
    name: 'Простор 125',
    area: 125,
    bedrooms: 3,
    images: [
      
        '/img/Простор/76_Built_1739347846_1001.webp',
        '/img/Простор/76_Built_1739347846_1002.webp',
        '/img/Простор/76_Built_1739347846_2001.webp',
        '/img/Простор/2025-08-24_15-27-38.webp',
        '/img/Простор/76_ImagesInter_1628865637_9.webp',
        '/img/Простор/76_ImagesInter_1628865687_15.webp',
        '/img/Простор/76_Planirovki_1741773327_Skandi-161.webp',
    ],
    configurationLevels: [
      { id: 'box', name: 'Коробка', priceModifier: 3960000, description: 'Фундамент, стены и кровля. Основа вашего будущего дома, готовая к дальнейшей отделке.' },
      { id: 'komfort', name: 'Комфорт', priceModifier: 5310000, description: "Включает 'Коробку', утепление, окна, входную дверь и внешнюю отделку. Стены готовы под чистовую отделку." },
      { id: 'turnkey', name: 'Под ключ', priceModifier: 6770000, description: "Полностью готовый дом: комплектация 'Комфорт' плюс внутренняя отделка, электрика, сантехника и отопление." },
    ],
    facadeOptions: [
      { id: 'vinyl-siding', name: 'Сайдинг виниловый', priceModifier: 0, description: 'Базовая опция' },
      { id: 'metal-siding', name: 'Металлосайдинг', priceModifier: 230000 },
      { id: 'planken', name: 'Планкен', priceModifier: 575000 },
    ],
    roofOptions: [
      { id: 'metal-tile', name: 'Металлочерепица', priceModifier: 0, description: 'Базовая опция' },
      { id: 'flexible-tile', name: 'Гибкая черепица', priceModifier: 190000 },
      { id: 'composite-tile', name: 'Композитная черепица', priceModifier: 365000 },
    ],
    windowOptions: [
      { id: 'white', name: 'Белые', priceModifier: 0, description: 'Базовая опция' },
      { id: 'laminated', name: 'Ламинированные', priceModifier: 125000 },
    ],
    addons: [
      { id: 'terrace', name: 'Терраса 21.5 м²', priceModifier: 315000, checked: false },
      { id: 'carport', name: 'Навес для авто', priceModifier: 250000, checked: false },
      { id: 'garage', name: 'Гараж', priceModifier: 700000, checked: false },
    ],
  },
  {
    id: 'custom',
    name: 'Индивидуальный проект',
    area: 100,
    minArea: 60,
    maxArea: 250,
    bedrooms: 3,
    isCustom: true,
    description: 'Не нашли подходящий проект? Создайте свой! Цена — ориентир для дома 100 м², настройте и получите точный расчет.',
    images: [
      '/img/Индивидуалка/79_Image_1603981842_Skandi-180_Izburg_1.webp',
      '/img/Индивидуалка/79_Image_1603981842_Skandi-180_Izburg_2.webp',
      '/img/Индивидуалка/dc08945868cf50ad94fdf522924cb899.webp',
      '/img/Индивидуалка/1aa81d5b9c0da2c48200a7cf774c2164.webp',
    ],
    configurationLevels: [
      { id: 'box', name: 'Коробка', priceModifier: 0, pricePerSqm: 32000, description: 'Фундамент, стены и кровля. Основа вашего будущего дома, готовая к дальнейшей отделке.' },
      { id: 'komfort', name: 'Комфорт', priceModifier: 0, pricePerSqm: 43000, description: "Включает 'Коробку', утепление, окна, входную дверь и внешнюю отделку. Стены готовы под чистовую отделку." },
      { id: 'turnkey', name: 'Под ключ', priceModifier: 0, pricePerSqm: 58000, description: "Полностью готовый дом: комплектация 'Комфорт' плюс внутренняя отделка, электрика, сантехника и отопление." },
    ],
    facadeOptions: [
      { id: 'vinyl-siding', name: 'Сайдинг виниловый', priceModifier: 0, pricePerSqm: 0, description: 'Базовая опция' },
      { id: 'metal-siding', name: 'Металлосайдинг', priceModifier: 0, pricePerSqm: 1800 },
      { id: 'planken', name: 'Планкен', priceModifier: 0, pricePerSqm: 4800 },
    ],
    roofOptions: [
      { id: 'metal-tile', name: 'Металлочерепица', priceModifier: 0, pricePerSqm: 0, description: 'Базовая опция' },
      { id: 'flexible-tile', name: 'Гибкая черепица', priceModifier: 0, pricePerSqm: 1500 },
    ],
    windowOptions: [
      { id: 'white', name: 'Белые', priceModifier: 0, pricePerSqm: 0, description: 'Базовая опция' },
      { id: 'laminated', name: 'Ламинированные', priceModifier: 0, pricePerSqm: 1000 },
    ],
    addons: [
      { id: 'terrace', name: 'Терраса', priceModifier: 300000, checked: false },
      { id: 'carport', name: 'Навес для авто', priceModifier: 220000, checked: false },
      { id: 'garage', name: 'Гараж', priceModifier: 750000, checked: false },
    ],
  }
];