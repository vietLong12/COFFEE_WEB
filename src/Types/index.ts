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

export interface ProductCart {
  itemId: number | string;
  productName: string;
  note: string;
  price: number;
  size: string;
  quantity: number;
  category: string;
  total: number;
}

export interface Account{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}