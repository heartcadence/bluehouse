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
  
  // Fields used in existing components
  projectName: string;
  gallery: any[];
  shortDescription?: string;
  linkedPlan?: {
    _id: string;
    category: string;
    title: string;
  };

  // Fields requested for build fix / future compatibility
  title?: string;
  slug?: { current: string };
  mainImage?: any; // We can use 'any' for the Sanity image object to prevent errors
  categories?: { title: string }[];
}

export type Category = 'All' | 'Modern' | 'Family' | 'Cottage' | 'Estate';

export interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}