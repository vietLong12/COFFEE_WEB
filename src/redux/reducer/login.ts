import Swal from "sweetalert2";
import { Account } from "../../Types";
import { CREATE_ACCOUNT, LOGIN, LOGOUT } from "../constant";

const listAccountLS: Account[] = JSON.parse(
  localStorage.getItem("accounts") as string
);

const accounts = listAccountLS ? listAccountLS : [];

const initValue: boolean = false;

interface ActionLogin {
  type: string;
  payload: {
    email: string;
    password: string;
  };
}

export default function appReducer(
  state: boolean = initValue,
  action: ActionLogin
) {
  switch (action.type) {
    case LOGIN: {
      const email = action.payload.email;
      const password = action.payload.password;

      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === email && accounts[i].password === password) {
          Swal.fire("Login thanh cong");
          return true;
        }
      }
      Swal.fire("Login failed");
      return false;
    }
    case LOGOUT: {
      return false;
    }
    default:
      return state;
  }
}
