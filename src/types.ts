export interface Product {
  _id: string;
  _type: string;
  title: string;
  price?: number;
  category?: string;
  slug?: { current: string };
  // Sanity Fields
  exteriorGallery?: any[]; 
  specs?: {
    sqft: number;
    beds: number;
    baths: number;
    width?: number;
    depth?: number;
  };
  technicalPlansUrl?: string;
  floorPlanPreviews?: { url: string }[];
  // Legacy support for Mock data
  images?: string[]; 
  blueprints?: string[];
  fileFormat?: string;
  // UI Helper
  isPlaceholder?: boolean;
}

export interface Project {
  _id: string;
  _type: 'project';
  projectName: string;
  gallery: any[];
  shortDescription?: string;
  linkedPlan?: {
    _id: string;
    category: string;
    title: string;
  };
}

export type Category = 'All' | 'Modern' | 'Family' | 'Cottage' | 'Estate';

export interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}