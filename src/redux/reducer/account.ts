import Swal from "sweetalert2";
import { Account } from "../../Types";
import { CREATE_ACCOUNT } from "../constant";

const listAccountLS: Account[] = JSON.parse(
  localStorage.getItem("accounts") as string
);

const accounts = listAccountLS ? listAccountLS : [];

const initValue: any = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

interface ActionLogin {
  type: string;
  payload: Account;
}

export default function appReducer(
  state: Account = initValue,
  action: ActionLogin
) {
  switch (action.type) {
    case CREATE_ACCOUNT: {
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email == action.payload.email) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Có gì đó không ổn!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          return null;
        }
      }
      accounts.push(action.payload);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      Swal.fire("Tạo tài khoản thành công!");
      return action.payload;
    }
    default:
      return state;
  }
}
