import { SHOW_CART } from "../constant";

export const showCartAction = (payload: boolean) => ({
  type: SHOW_CART,
  payload: payload,
});
