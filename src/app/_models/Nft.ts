export interface Nft {
  id: number;
  name: string;
  description: string;
  author: string;
  owner: string;
  price: number;
  categories: string[];
  type: string;
  currency: string;
  path: string;
}
