import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  'All',
  'Modern Farmhouse',
  'Cottage',
  'Contemporary',
  'Estate'
];

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: '1',
    _type: 'product',
    title: 'The Minimalist Haven',
    price: 1200,
    category: 'Modern Farmhouse',
    slug: { current: 'minimalist-haven' },
    // Dusk/Night shot, modern architecture
    imageFront: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', 
    imageBack: 'https://placehold.co/600x800/063543/F2F2F2?text=BLUEPRINT+VIEW\nMinimalist+Haven',
    fileFormat: 'PDF',
    sqft: 2400,
    bedrooms: 3,
    bathrooms: 2.5
  },
  {
    _id: '2',
    _type: 'product',
    title: 'Nocturne Manor',
    price: 3500,
    category: 'Estate',
    slug: { current: 'nocturne-manor' },
    // Luxury night pool shot
    imageFront: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
    imageBack: 'https://placehold.co/600x800/063543/F2F2F2?text=BLUEPRINT+VIEW\nNocturne+Manor',
    fileFormat: 'PDF',
    sqft: 5200,
    bedrooms: 6,
    bathrooms: 5
  },
  {
    _id: '3',
    _type: 'product',
    title: 'Creekside Retreat',
    price: 850,
    category: 'Cottage',
    slug: { current: 'creekside-retreat' },
    // Cozy cabin night
    imageFront: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop',
    imageBack: 'https://placehold.co/600x800/063543/F2F2F2?text=BLUEPRINT+VIEW\nCreekside+Retreat',
    fileFormat: 'PDF',
    sqft: 1100,
    bedrooms: 2,
    bathrooms: 1
  },
  {
    _id: '4',
    _type: 'product',
    title: 'Obsidian Cube',
    price: 1800,
    category: 'Contemporary',
    slug: { current: 'obsidian-cube' },
    // Modern geometric dark
    imageFront: 'https://images.unsplash.com/photo-1524061511843-fd43443e3cb2?q=80&w=2070&auto=format&fit=crop',
    imageBack: 'https://placehold.co/600x800/063543/F2F2F2?text=BLUEPRINT+VIEW\nObsidian+Cube',
    fileFormat: 'PDF',
    sqft: 3100,
    bedrooms: 4,
    bathrooms: 3
  },
  {
    _id: '5',
    _type: 'product',
    title: 'Glass Horizon',
    price: 2200,
    category: 'Contemporary',
    slug: { current: 'glass-horizon' },
    // Glass house at night
    imageFront: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop',
    imageBack: 'https://placehold.co/600x800/063543/F2F2F2?text=BLUEPRINT+VIEW\nGlass+Horizon',
    fileFormat: 'PDF',
    sqft: 2800,
    bedrooms: 3,
    bathrooms: 3
  },
  {
    _id: '6',
    _type: 'product',
    title: 'The Gilded Estate',
    price: 4500,
    category: 'Estate',
    slug: { current: 'gilded-estate' },
    // Large mansion lit up
    imageFront: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    imageBack: 'https://placehold.co/600x800/063543/F2F2F2?text=BLUEPRINT+VIEW\nThe+Gilded+Estate',
    fileFormat: 'PDF',
    sqft: 6500,
    bedrooms: 7,
    bathrooms: 6.5
  }
];