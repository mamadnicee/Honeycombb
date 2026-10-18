export interface SwirlSection {
  id: string;
  tag: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  buttonText: string;
  hotspots: Hotspot[];
  mode: 'glass-swirl' | 'infinity-loop' | 'vortex-splash';
  flavorNotes: string[];
  swirlColor: string;
}

export interface Hotspot {
  id: string;
  name: string;
  description: string;
  origin: string;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
}

export interface ProductItem {
  id: string;
  name: string;
  persianName: string;
  category: string;
  price: number;
  rating: number;
  volume: string;
  description: string;
  tastingNotes: string[];
  image: string;
  inStock: boolean;
  intensity: number; // 1-5
}

export interface MixerSettings {
  honeyType: 'mountain' | 'wildflower' | 'acacia' | 'caramel';
  viscosity: number; // 1 to 10
  swirlSpeed: number; // 0.5 to 3
  roastLevel: number; // 1 to 5
  iceLevel: number; // 1 to 5
  glowIntensity: number; // 0.5 to 2
}
