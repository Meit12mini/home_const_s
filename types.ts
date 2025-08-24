
export interface Option {
  id: string;
  name: string;
  priceModifier: number;
  pricePerSqm?: number;
  description?: string;
}

export interface ConfigurationLevel extends Option {}
export interface CustomizationOption extends Option {}
export interface AddonOption extends Option {
    checked: boolean;
}

export interface Project {
  id: string;
  name: string;
  area: number;
  bedrooms: number;
  images: string[];
  description?: string;
  isCustom?: boolean;
  minArea?: number;
  maxArea?: number;
  configurationLevels: ConfigurationLevel[];
  facadeOptions: CustomizationOption[];
  roofOptions: CustomizationOption[];
  windowOptions: CustomizationOption[];
  addons: AddonOption[];
}

export interface StoneMaterialOption {
  id: string;
  name: string;
  priceModifier: number;
  description: string;
  durationText: string;
}
