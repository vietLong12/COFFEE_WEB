import { SHOW_CART } from "../constant";

interface TActionType {
  type: string;
  payload: boolean;
}

export default function appReducer(state = false, action: TActionType) {
  switch (action.type) {
    case SHOW_CART: {
      return action.payload;
    }
    default:
      return state;
  }
}
