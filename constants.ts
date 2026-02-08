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
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    ],
    blueprints: [
      'https://placehold.co/800x600/002147/F2F2F2?text=Main+Floor+Plan',
      'https://placehold.co/800x600/002147/F2F2F2?text=Second+Floor+Plan',
      'https://placehold.co/800x600/002147/F2F2F2?text=Elevations'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop'
    ],
    blueprints: [
      'https://placehold.co/800x600/002147/F2F2F2?text=Ground+Level',
      'https://placehold.co/800x600/002147/F2F2F2?text=Upper+Level',
      'https://placehold.co/800x600/002147/F2F2F2?text=Site+Plan'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=2077&auto=format&fit=crop'
    ],
    blueprints: [
      'https://placehold.co/800x600/002147/F2F2F2?text=Floor+Plan',
      'https://placehold.co/800x600/002147/F2F2F2?text=Roof+Plan'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1524061511843-fd43443e3cb2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
    ],
    blueprints: [
      'https://placehold.co/800x600/002147/F2F2F2?text=Layout+A',
      'https://placehold.co/800x600/002147/F2F2F2?text=Layout+B'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop'
    ],
    blueprints: [
      'https://placehold.co/800x600/002147/F2F2F2?text=Main+Layout',
      'https://placehold.co/800x600/002147/F2F2F2?text=Structural+Details'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop'
    ],
    blueprints: [
      'https://placehold.co/800x600/002147/F2F2F2?text=Estate+Master+Plan',
      'https://placehold.co/800x600/002147/F2F2F2?text=Guest+House',
      'https://placehold.co/800x600/002147/F2F2F2?text=Gardens'
    ],
    fileFormat: 'PDF',
    sqft: 6500,
    bedrooms: 7,
    bathrooms: 6.5
  }
];