
import React, { useState } from 'react';
import { Project, CustomizationOption, ConfigurationLevel, AddonOption, StoneMaterialOption } from '../types';
import { useHouseConstructor, stoneMaterials } from '../hooks/useHouseConstructor';
import Button from './ui/Button';

interface ConstructorProps {
  project: Project | null;
}

const Constructor: React.FC<ConstructorProps> = ({ project }) => {
  const {
    selectedConfig, setSelectedConfig,
    selectedFacade, setSelectedFacade,
    selectedRoof, setSelectedRoof,
    selectedWindows, setSelectedWindows,
    selectedAddons, handleToggleAddon,
    basePrice, optionsPrice, totalPrice, getFullConfiguration,
    customArea, setCustomArea,
    technology, setTechnology,
    selectedStoneMaterial, setSelectedStoneMaterial,
    technologyPrice, durationText
  } = useHouseConstructor(project);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!project) {
    return (
      <section id="constructor" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Соберите дом своей мечты</h2>
          <p className="text-lg text-gray-600">Пожалуйста, выберите проект выше, чтобы начать конструирование.</p>
        </div>
      </section>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const configuration = getFullConfiguration();
    console.log('--- ЗАЯВКА НА СМЕТУ ---');
    console.log('Имя:', name);
    console.log('Телефон:', phone);
    console.log('Конфигурация:', configuration);
    console.log('-----------------------');
    setSubmitted(true);
  };
  
  const AddonSelector = ({ addons, onToggle, stepNumber }: { addons: AddonOption[]; onToggle: (id: string) => void; stepNumber: number; }) => (
     <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-800 mb-3">Шаг {stepNumber}. Добавьте опции</h4>
        <div className="space-y-3">
        {addons.map((addon) => (
          <label key={addon.id} className="flex items-center p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-brand-blue transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={addon.checked}
              onChange={() => onToggle(addon.id)}
              className="h-5 w-5 rounded text-brand-blue focus:ring-brand-blue"
            />
            <span className="ml-3 text-gray-700 font-medium">{addon.name}</span>
            <span className="ml-auto font-bold text-gray-900">
              + {addon.priceModifier.toLocaleString('ru-RU')} ₽
            </span>
          </label>
        ))}
        </div>
     </div>
  );

  const TechnologySelector = () => (
    <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-2xl font-bold text-brand-dark text-center mb-6">Технология строительства Вашего дома</h3>
        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-300 mb-6">
            <button
                onClick={() => setTechnology('frame')}
                className={`px-6 py-3 font-semibold text-lg transition-colors ${technology === 'frame' ? 'border-b-4 border-brand-blue text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                role="tab"
                aria-selected={technology === 'frame'}
            >
                Каркасная технология (Рекомендуем)
            </button>
            <button
                onClick={() => setTechnology('stone')}
                className={`px-6 py-3 font-semibold text-lg transition-colors ${technology === 'stone' ? 'border-b-4 border-brand-blue text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                role="tab"
                aria-selected={technology === 'stone'}
            >
                Каменные дома
            </button>
        </div>

        {/* Content */}
        <div>
            {technology === 'frame' ? (
                <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-gray-700">Самый сбалансированный выбор для нашего климата. Максимально теплый дом за разумные деньги и рекордно короткий срок. Именно так строят в Скандинавии и Канаде. <span className="font-bold">Срок строительства: от 4 месяцев.</span></p>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4" role="radiogroup">
                        {stoneMaterials.map(material => (
                            <div key={material.id}>
                                <input
                                    type="radio"
                                    id={material.id}
                                    name="stone-material"
                                    value={material.id}
                                    checked={selectedStoneMaterial?.id === material.id}
                                    onChange={() => setSelectedStoneMaterial(material)}
                                    className="sr-only"
                                />
                                <label
                                    htmlFor={material.id}
                                    className={`block text-center p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedStoneMaterial?.id === material.id ? 'bg-blue-50 border-brand-blue shadow-md' : 'bg-white border-gray-200 hover:border-brand-blue'}`}
                                >
                                    <span className="font-bold text-brand-dark">{material.name}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                    {selectedStoneMaterial && (
                        <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-gray-700">{selectedStoneMaterial.description} <span className="font-bold">Срок: {selectedStoneMaterial.durationText}. Удорожание: +{selectedStoneMaterial.priceModifier.toLocaleString('ru-RU')} ₽.</span></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );

  const stepOffset = project.isCustom ? 1 : 0;
  const isBoxConfiguration = selectedConfig?.id === 'box';

  return (
    <section id="constructor-section" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark">Конструктор Дома</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Выбран проект: <span className="font-bold text-brand-blue">{project.name}</span>
            </p>
            {project.isCustom && (
              <div className="mt-4 max-w-2xl mx-auto p-4 bg-amber-100 text-amber-800 rounded-lg border border-amber-300">
                  <p className="font-semibold">Это индивидуальный проект!</p>
                  <p className="text-sm">
                  Вы можете настроить площадь дома. Расчет является ориентировочным. Оставьте заявку, и мы бесплатно подготовим для вас точную смету.
                  </p>
              </div>
            )}
        </div>

        <TechnologySelector />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Visual Part */}
          <div className="lg:col-span-3">
            <div>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl mb-4">
                <img src={project.images[currentImageIndex]} alt={`${project.name} вид ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {project.images.map((img, index) => (
                  <button key={index} onClick={() => setCurrentImageIndex(index)} className={`rounded-lg overflow-hidden border-4 ${index === currentImageIndex ? 'border-brand-blue' : 'border-transparent'}`}>
                    <img src={img} alt={`Миниатюра ${index + 1}`} className="w-full h-full object-cover aspect-video"/>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Calculator Part */}
          <div className="lg:col-span-2">
             <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-brand-dark mb-6">Ваша конфигурация</h3>
                
                {project.isCustom && (
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">Шаг 1. Укажите площадь</h4>
                        <div className="space-y-3 p-3 bg-white rounded-lg border-2 border-gray-200">
                            <div className="flex justify-between items-center mb-1">
                            <label htmlFor="area-slider" className="text-gray-700 font-medium">Площадь дома:</label>
                            <span className="font-bold text-brand-blue text-xl">{customArea} м²</span>
                            </div>
                            <input
                            id="area-slider"
                            type="range"
                            min={project.minArea || 60}
                            max={project.maxArea || 250}
                            value={customArea}
                            onChange={(e) => setCustomArea(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                            aria-label="Выбор площади дома"
                            />
                            <div className="text-xs text-gray-500 flex justify-between">
                                <span>{project.minArea || 60} м²</span>
                                <span>{project.maxArea || 250} м²</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Шаг {1 + stepOffset}. Выберите комплектацию</h4>
                    <div className="space-y-3" role="radiogroup">
                        {project.configurationLevels.map((config) => (
                            <div
                                key={config.id}
                                onClick={() => setSelectedConfig(config)}
                                onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setSelectedConfig(config)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                    selectedConfig?.id === config.id
                                        ? 'bg-blue-50 border-brand-blue shadow-md'
                                        : 'bg-white border-gray-200 hover:border-brand-blue hover:shadow-sm'
                                }`}
                                role="radio"
                                aria-checked={selectedConfig?.id === config.id}
                                tabIndex={0}
                                aria-label={`${config.name}. ${config.description}.`}
                            >
                                <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                                    <span className="font-bold text-brand-dark">{config.name}</span>
                                    <span className="font-extrabold text-brand-blue text-lg">
                                      {project.isCustom ? `${config.pricePerSqm?.toLocaleString('ru-RU')} ₽/м²` : `${config.priceModifier.toLocaleString('ru-RU')} ₽`}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Шаг {2 + stepOffset}. Настройте внешний вид</h4>
                  {project.isCustom ? (
                    <>
                      {isBoxConfiguration && (
                        <div className="mb-3 text-sm text-gray-500 p-3 bg-gray-100 rounded-md border border-gray-200">
                            <p>Отделка фасада и установка окон доступны в комплектациях «White Box» и «Под ключ».</p>
                        </div>
                      )}
                       <div className="space-y-4">
                          <CustomizationDropdown label="Фасад" options={project.facadeOptions} selected={selectedFacade} onSelect={setSelectedFacade} isCustom={project.isCustom} disabled={isBoxConfiguration}/>
                          <CustomizationDropdown label="Кровля" options={project.roofOptions} selected={selectedRoof} onSelect={setSelectedRoof} isCustom={project.isCustom} />
                          <CustomizationDropdown label="Окна" options={project.windowOptions} selected={selectedWindows} onSelect={setSelectedWindows} isCustom={project.isCustom} disabled={isBoxConfiguration}/>
                       </div>
                    </>
                  ) : (
                    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700 mb-4">
                            Для типовых проектов мы подобрали оптимальные и долговечные материалы. Они уже включены в стоимость.
                        </p>
                        <ul className="list-none space-y-2 text-gray-800">
                            <li className={`flex justify-between items-center transition-opacity ${isBoxConfiguration ? 'opacity-50' : 'opacity-100'}`}>
                                <span>Фасад:</span>
                                <span className="font-semibold bg-white py-1 px-3 rounded-md border border-gray-200 shadow-sm">{selectedFacade?.name}</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Кровля:</span>
                                <span className="font-semibold bg-white py-1 px-3 rounded-md border border-gray-200 shadow-sm">{selectedRoof?.name}</span>
                            </li>
                            <li className={`flex justify-between items-center transition-opacity ${isBoxConfiguration ? 'opacity-50' : 'opacity-100'}`}>
                                <span>Окна:</span>
                                <span className="font-semibold bg-white py-1 px-3 rounded-md border border-gray-200 shadow-sm">{selectedWindows?.name}</span>
                            </li>
                        </ul>
                        {isBoxConfiguration && (
                            <p className="text-xs text-amber-800 pt-3 border-t border-gray-200 mt-3 font-medium">
                                * Внешняя отделка и окна не входят в комплектацию «Коробка».
                            </p>
                        )}
                    </div>
                  )}
                </div>
                
                <AddonSelector addons={selectedAddons} onToggle={handleToggleAddon} stepNumber={3 + stepOffset} />

                <div className="mt-8 bg-white p-4 rounded-lg border-2 border-brand-blue">
                    <div className="flex justify-between items-center text-gray-600 mb-2">
                        <span>Базовая стоимость:</span>
                        <span className="font-medium">{basePrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 mb-2">
                        <span>Стоимость опций:</span>
                        <span className="font-medium">{optionsPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    {technology === 'stone' && technologyPrice > 0 && (
                        <div className="flex justify-between items-center text-gray-600 mb-2">
                            <span>Технология ({selectedStoneMaterial.name}):</span>
                            <span className="font-medium">+{technologyPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-gray-600 mb-3">
                        <span>Срок строительства:</span>
                        <span className="font-medium">{durationText}</span>
                    </div>
                    <hr className="my-3 border-gray-300"/>
                    <div className="flex justify-between items-center text-brand-dark font-extrabold text-2xl">
                        <span>ИТОГО:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">Получить точную смету</h3>
                {submitted ? (
                     <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                        <h4 className="font-bold">Спасибо!</h4>
                        <p>Ваша заявка отправлена. Мы скоро свяжемся с вами.</p>
                     </div>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <div className="space-y-4">
                            <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-brand-blue focus:ring-brand-blue"/>
                            <input type="tel" placeholder="Ваш телефон (WhatsApp/Telegram)" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-brand-blue focus:ring-brand-blue"/>
                            <Button type="submit" variant="primary" size="lg" className="w-full">
                                Получить смету и планировку
                            </Button>
                        </div>
                    </form>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const CustomizationDropdown = <T extends { id: string; name: string; priceModifier: number; pricePerSqm?: number; }> (
    { label, options, selected, onSelect, isCustom, disabled }: { label: string; options: T[]; selected: T | null; onSelect: (option: T) => void; isCustom?: boolean; disabled?: boolean; }
  ) => {
    const getPriceLabel = (option: T) => {
        if (isCustom) {
            const price = option.pricePerSqm || 0;
            if (price > 0) return `(+${price.toLocaleString('ru-RU')} ₽/м²)`;
            return '(база)';
        }
        const price = option.priceModifier;
        if (price > 0) return `(+${price.toLocaleString('ru-RU')} ₽)`;
        return '(база)';
    };

    return (
    <div className={`transition-opacity ${disabled ? 'opacity-50' : 'opacity-100'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
          value={selected?.id || ''}
          onChange={(e) => {
            const selectedOption = options.find(opt => opt.id === e.target.value);
            if (selectedOption) onSelect(selectedOption);
          }}
          className="w-full px-3 py-2 bg-white rounded-lg border-gray-300 focus:border-brand-blue focus:ring-brand-blue shadow-sm disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name} {getPriceLabel(option)}
            </option>
          ))}
        </select>
    </div>
    );
};


export default Constructor;
