import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  'All',
  'Modern',
  'Family',
  'Cottage',
  'Estate'
];

export const PLACEHOLDER_PRODUCT: Product = {
  _id: 'placeholder',
  _type: 'product',
  title: 'Coming Soon',
  price: 0,
  category: 'All',
  isPlaceholder: true,
  exteriorGallery: [
    'https://images.unsplash.com/photo-1518005052357-e98470136518?q=80&w=2070&auto=format&fit=crop' // Generic blueprint/arch background
  ],
  specs: {
    sqft: 0,
    beds: 0,
    baths: 0,
    width: 0,
    depth: 0
  },
  floorPlanPreviews: [],
  blueprints: [],
  fileFormat: 'PDF'
};

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: '1',
    _type: 'product',
    title: 'The Minimalist Haven',
    price: 1200,
    category: 'Modern',
    slug: { current: 'minimalist-haven' },
    exteriorGallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    ],
    specs: {
      sqft: 2400,
      beds: 3,
      baths: 2.5,
      width: 40,
      depth: 60
    },
    floorPlanPreviews: [
      { url: 'https://placehold.co/800x600/002147/F2F2F2?text=Main+Floor+Plan' },
      { url: 'https://placehold.co/800x600/002147/F2F2F2?text=Second+Floor+Plan' }
    ],
    fileFormat: 'PDF'
  },
  {
    _id: '2',
    _type: 'product',
    title: 'Nocturne Manor',
    price: 3500,
    category: 'Estate',
    slug: { current: 'nocturne-manor' },
    exteriorGallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop'
    ],
    specs: {
      sqft: 5200,
      beds: 6,
      baths: 5,
      width: 75,
      depth: 80
    },
    floorPlanPreviews: [
      { url: 'https://placehold.co/800x600/002147/F2F2F2?text=Ground+Level' },
      { url: 'https://placehold.co/800x600/002147/F2F2F2?text=Upper+Level' }
    ],
    fileFormat: 'PDF'
  },
  {
    _id: '3',
    _type: 'product',
    title: 'Creekside Retreat',
    price: 850,
    category: 'Cottage',
    slug: { current: 'creekside-retreat' },
    exteriorGallery: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop'
    ],
    specs: {
      sqft: 1100,
      beds: 2,
      baths: 1,
      width: 30,
      depth: 40
    },
    floorPlanPreviews: [
      { url: 'https://placehold.co/800x600/002147/F2F2F2?text=Floor+Plan' }
    ],
    fileFormat: 'PDF'
  }
];