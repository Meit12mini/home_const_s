
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Project, AddonOption, CustomizationOption, ConfigurationLevel, StoneMaterialOption } from '../types';

export const stoneMaterials: StoneMaterialOption[] = [
  {
    id: 'aerated-concrete',
    name: 'Газобетон',
    priceModifier: 800000,
    durationText: 'от 7 месяцев',
    description: "Надежный и проверенный временем материал. Ваш дом будет 'каменной крепостью'. Требует более мощного фундамента и больше времени на 'мокрые' процессы."
  },
  {
    id: 'wood-concrete',
    name: 'Арболит',
    priceModifier: 1100000,
    durationText: 'от 8 месяцев',
    description: "Экологичный и 'дышащий' материал с отличными теплоизоляционными свойствами. Сочетает прочность камня и теплоту дерева."
  },
  {
    id: 'brick',
    name: 'Кирпич',
    priceModifier: 1500000,
    durationText: 'от 9 месяцев',
    description: "Классика домостроения. Максимальная прочность и престиж. Самый дорогой и долгий в реализации вариант, требующий серьезного утепления в нашем климате."
  }
];

export const useHouseConstructor = (project: Project | null) => {
  const [selectedConfig, setSelectedConfig] = useState<ConfigurationLevel | null>(null);
  const [selectedFacade, setSelectedFacade] = useState<CustomizationOption | null>(null);
  const [selectedRoof, setSelectedRoof] = useState<CustomizationOption | null>(null);
  const [selectedWindows, setSelectedWindows] = useState<CustomizationOption | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [customArea, setCustomArea] = useState(project?.isCustom ? project.area : 100);

  // State for construction technology
  const [technology, setTechnology] = useState<'frame' | 'stone'>('frame');
  const [selectedStoneMaterial, setSelectedStoneMaterial] = useState<StoneMaterialOption>(stoneMaterials[0]);

  useEffect(() => {
    if (project) {
      setSelectedConfig(project.configurationLevels[0]);
      setSelectedFacade(project.facadeOptions.find(opt => (project.isCustom ? opt.pricePerSqm === 0 : opt.priceModifier === 0)) || project.facadeOptions[0]);
      setSelectedRoof(project.roofOptions.find(opt => (project.isCustom ? opt.pricePerSqm === 0 : opt.priceModifier === 0)) || project.roofOptions[0]);
      setSelectedWindows(project.windowOptions.find(opt => (project.isCustom ? opt.pricePerSqm === 0 : opt.priceModifier === 0)) || project.windowOptions[0]);
      setSelectedAddons(project.addons.map(addon => ({ ...addon, checked: false })));
      setCustomArea(project.isCustom ? project.area : 100);

      // Reset technology state on project change
      setTechnology('frame');
      setSelectedStoneMaterial(stoneMaterials[0]);
    }
  }, [project]);

  // Handle logic when configuration level changes
  useEffect(() => {
    if (project && selectedConfig?.id === 'box') {
      // Facade and windows are not included in the 'box' configuration, so reset to default
      const defaultFacade = project.facadeOptions.find(opt => (project.isCustom ? opt.pricePerSqm === 0 : opt.priceModifier === 0)) || project.facadeOptions[0];
      const defaultWindows = project.windowOptions.find(opt => (project.isCustom ? opt.pricePerSqm === 0 : opt.priceModifier === 0)) || project.windowOptions[0];
      setSelectedFacade(defaultFacade);
      setSelectedWindows(defaultWindows);
    }
  }, [selectedConfig, project]);


  const handleToggleAddon = useCallback((addonId: string) => {
    setSelectedAddons(prevAddons =>
      prevAddons.map(addon =>
        addon.id === addonId ? { ...addon, checked: !addon.checked } : addon
      )
    );
  }, []);

  const { basePrice, optionsPrice, technologyPrice, totalPrice, durationText } = useMemo(() => {
     if (!project) return { basePrice: 0, optionsPrice: 0, technologyPrice: 0, totalPrice: 0, durationText: '' };

    let basePrice = 0;
    let optionsPrice = 0;
    let technologyPrice = 0;
    let durationText = 'от 4 месяцев';

    if (technology === 'stone' && selectedStoneMaterial) {
        technologyPrice = selectedStoneMaterial.priceModifier;
        durationText = selectedStoneMaterial.durationText;
    }

    const addonsPrice = selectedAddons
      .filter(addon => addon.checked)
      .reduce((sum, addon) => sum + addon.priceModifier, 0);

    if (project.isCustom) {
        const area = customArea;
        const configPricePerSqm = selectedConfig?.pricePerSqm || 0;
        basePrice = configPricePerSqm * area;

        const facadePricePerSqm = selectedFacade?.pricePerSqm || 0;
        const roofPricePerSqm = selectedRoof?.pricePerSqm || 0;
        const windowsPricePerSqm = selectedWindows?.pricePerSqm || 0;
        
        const customizationPrice = (facadePricePerSqm + roofPricePerSqm + windowsPricePerSqm) * area;
        optionsPrice = customizationPrice + addonsPrice;

    } else {
        basePrice = selectedConfig?.priceModifier || 0;
        
        const facadePrice = selectedFacade?.priceModifier || 0;
        const roofPrice = selectedRoof?.priceModifier || 0;
        const windowsPrice = selectedWindows?.priceModifier || 0;
        
        optionsPrice = facadePrice + roofPrice + windowsPrice + addonsPrice;
    }
    
    return {
      basePrice,
      optionsPrice,
      technologyPrice,
      totalPrice: basePrice + optionsPrice + technologyPrice,
      durationText
    };
  }, [project, customArea, selectedConfig, selectedFacade, selectedRoof, selectedWindows, selectedAddons, technology, selectedStoneMaterial]);
  
  const getFullConfiguration = () => {
    if (!project) return null;
    const configData: { [key: string]: any } = {
        project: project.name,
        technology: technology === 'frame' ? 'Каркасная' : `Каменная (${selectedStoneMaterial.name})`,
        configuration: selectedConfig?.name,
        facade: selectedFacade?.name,
        roof: selectedRoof?.name,
        windows: selectedWindows?.name,
        addons: selectedAddons.filter(a => a.checked).map(a => a.name),
        totalPrice: totalPrice.toLocaleString('ru-RU'),
    };

    if (project.isCustom) {
        configData.area = customArea;
    }
    
    return configData;
  };

  return {
    selectedConfig,
    setSelectedConfig,
    selectedFacade,
    setSelectedFacade,
    selectedRoof,
    setSelectedRoof,
    selectedWindows,
    setSelectedWindows,
    selectedAddons,
    handleToggleAddon,
    basePrice,
    optionsPrice,
    totalPrice,
    getFullConfiguration,
    customArea,
    setCustomArea,
    // New exports
    technology,
    setTechnology,
    selectedStoneMaterial,
    setSelectedStoneMaterial,
    technologyPrice,
    durationText,
  };
};