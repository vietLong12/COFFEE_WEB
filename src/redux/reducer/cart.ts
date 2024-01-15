import {
  IncreaseQuantityPayload,
  ProductPayload,
} from "../action/AddProductToCart";
import { ADD_PRODUCT, CHANGE_PRODUCT_QUANTITY, GET_CART } from "../constant";

interface TProduct {
  type: string;
  payload: ProductPayload | IncreaseQuantityPayload;
}

const initValue: ProductPayload[] = [];

export default function appReducer(
  state: ProductPayload[] = initValue,
  action: TProduct
) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const newProduct = action.payload;
      let isExist = false;
      let temp = JSON.parse(JSON.stringify(state));

      for (let i = 0; i < temp.length; i++) {
        if (
          temp[i].itemId === newProduct._id &&
          temp[i].size === newProduct.size
        ) {
          isExist = true;
          temp[i].quantity += newProduct.quantity;
          temp[i].total = temp[i].quantity * temp[i].price;
        }
      }
      if (!isExist) {
        temp = [...temp, newProduct];
      }

      return temp;
    }
    case GET_CART: {
      const temp = JSON.parse(JSON.stringify(state));

      return [...temp];
    }

    case CHANGE_PRODUCT_QUANTITY: {
      let temp = JSON.parse(JSON.stringify(state));
      console.log("temp: ", temp);
      temp = temp
        .map((item) => {
          if (
            item._id === action.payload._id &&
            item.size?.toLowerCase() === action.payload.size?.toLowerCase()
          ) {
            const price = item.total / item.quantity;
            item.quantity += action.payload.quantity;
            item.total = item.quantity * price;
          }
          return item;
        })
        .filter((item) => item.quantity >= 1);
      if (!temp) {
        temp = [];
      }
      return [...temp];
    }
    default:
      return state;
  }
}
