export interface Product {
  _id: string;
  _type: string;
  title: string;
  price: number;
  category: string;
  slug: { current: string };
  imageFront: string;
  imageBack: string; // URL for the blueprint
  fileFormat: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
}

export type Category = 'All' | 'Modern Farmhouse' | 'Cottage' | 'Contemporary' | 'Estate';

export interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}