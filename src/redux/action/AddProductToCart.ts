import { ADD_PRODUCT, CHANGE_PRODUCT_QUANTITY, GET_CART } from "../constant";

export interface ProductPayload {
  _id: string;
  productName?: string | undefined;
  size?: string;
  note?: string;
  quantity?: number;
  total?: number;
}

export interface IncreaseQuantityPayload {
  _id: string;
  size: string;
  quantity: number;
}

export const addProductToCart = (payload: ProductPayload) => ({
  type: ADD_PRODUCT,
  payload: payload,
});

export const getCart = () => ({
  type: GET_CART,
});

export const changeQuantity = (payload: IncreaseQuantityPayload) => ({
  type: CHANGE_PRODUCT_QUANTITY,
  payload: payload,
});
