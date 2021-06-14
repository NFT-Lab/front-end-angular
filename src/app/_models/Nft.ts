import { Category } from './Category';
export interface Nft {
  id: number;
  name: string;
  description: string;
  author: string;
  owner: string;
  price: number;
  categories: Category[];
  type: string;
  currency: string;
  path: string;
}
