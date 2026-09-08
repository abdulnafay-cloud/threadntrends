export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  category: string;
  sub?: string;
  description: string;
  image: string;
  image2?: string;
  sizes: string[];
  colors: string[];
  stock: number;
  badge?: string;
  isActive?: boolean;
}
