interface Product {
  name: string;
  imagePath: string;
  price: number;
}

export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    _id: string;
    quantity: number;
    product: Product;
  }[];
}
