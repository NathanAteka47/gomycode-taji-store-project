

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'food' | 'water' | 'cakes';
}