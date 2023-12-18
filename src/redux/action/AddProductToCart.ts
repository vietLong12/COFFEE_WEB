import { ProductCart, TProduct } from "../../Types";
import { ADD_PRODUCT, GET_CART } from "../constant";

export const addProductToCart = (payload: ProductCart) => ({
  type: ADD_PRODUCT,
  payload: payload,
});

export const getCart = () => ({
  type: GET_CART
})