export interface TProduct {
  id: number;
  productName: string;
  price: number;
  size: string[];
  img: string;
  desc?: string;
  rating: number;
  inStock: boolean;
  category: string;
}

export interface TUserReview {
  id: string;
  username: string;
  gender: string;
  rateStar: number;
  img: string;
  cmt: string;
}

export interface Cart {
  items: CartItem[];
}

//27/12/2023
interface CartItem {
  productId: string;
  sizeId: string;
  note: string;
  quantity: number;
  _id?: string;
}

export interface Address {
  homeAddress?: string;
  city?: {
    code: number;
    name: string;
  };
  district?: {
    code: number;
    name: string;
  };
  ward?: {
    code: number;
    name: string;
  };
  defaultAddress?: boolean;
}

export interface Account {
  cart: {
    items: CartItem[];
  };
  _id: string;
  username: string;
  password: string;
  avatar: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  address: Address[];
}

export interface UserTransfer {
  username: string;
  email: string;
  phone: string;
  _id: string;
  address: Address[];
  avatar: string;
}

export interface OrderType {
  _id: string | number;
  orderDate: string;
  address: Address | undefined;
  priceTotal: number;
  status: boolean;
  shippingStatus: boolean;
  email: string;
}
