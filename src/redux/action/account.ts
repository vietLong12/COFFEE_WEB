import { Account } from "../../Types";
import { CREATE_ACCOUNT, LOGIN, LOGOUT } from "../constant";

export const createAccount = (payload: Account) => ({
  type: CREATE_ACCOUNT,
  payload: payload,
});

export const login = (payload: { email: string; password: string }) => ({
  type: LOGIN,
  payload: payload,
});

export const logout = () => ({
  type: LOGOUT,
});
