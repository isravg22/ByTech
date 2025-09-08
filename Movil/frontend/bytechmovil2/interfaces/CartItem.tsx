export type CartItem = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  amount: number;
};