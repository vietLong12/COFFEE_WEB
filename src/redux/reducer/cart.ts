import { ProductCart } from "../../Types";
import { ADD_PRODUCT, GET_CART } from "../constant";

interface TProduct {
  type: string;
  payload: ProductCart;
}

const initValue: ProductCart[] = [];

export default function appReducer(
  state: ProductCart[] = initValue,
  action: TProduct
) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const newProduct = action.payload;
      let isExist = false;
      let temp = JSON.parse(JSON.stringify(state));

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].itemId === newProduct.itemId && temp[i].size === newProduct.size) {
          isExist = true;
          temp[i].quantity += newProduct.quantity;
          temp[i].total = temp[i].quantity * temp[i].price
        }
      }
      if(!isExist){
        temp = [...temp, newProduct]
      }

      console.log("add product", temp);
      
      return temp;
    }
    case GET_CART: {
      const temp = JSON.parse(JSON.stringify(state));

      return [...temp];
    }
    default:
      return state;
  }
}
