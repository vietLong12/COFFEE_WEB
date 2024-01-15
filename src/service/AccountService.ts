import axios from "axios";
import Swal from "sweetalert2";
import { Address } from "../Types";
import { BASE_URL } from "./type";

const request = axios.create({
  baseURL: BASE_URL,
});

interface PostAccountReq {
  username: string;
  phone: string;
  password: string;
  email: string;
  avatar?: string;
}

interface PutAccount {
  user_id?: string;
  address?: Address[];
  password?: string;
  newPassword?: string;
}
interface CartRequest {
  accountId: string;
  productId: string;
  sizeId: string;
  quantity?: Number;
}

export class AccountService {
  static getAccountById = async (logReq: string) => {
    const response = await request.get(`/accounts/${logReq}`);
    return response.data;
  };

  static putAccount = async (logReq: PutAccount) => {
    try {
      const response = await request.put("/accounts", logReq);
      return response.data;
    } catch (error: any) {
      if (error.response.data.msg === "Change password failed") {
        Swal.fire({
          icon: "warning",
          title: "Có lỗi xảy ra",
          text: "Mật khẩu sai",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: error.message,
        });
      }
    }
  };

  static createAccount = async (postAccountReq: PostAccountReq) => {
    try {
      const response = await request.post(`/accounts`, postAccountReq);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Đăng ký tài khoản thành công",
          text: "Chúc bạn có một trải nghiệm tuyệt vời với Monster",
        });
      }
      return response.data;
    } catch (error: any) {
      if (error.response.data.msg === "Email is exist") {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Email đã tồn tại",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: error.response.data.msg,
        });
      }
    }
  };
  static addProductToCart = async (reqBody: CartRequest) => {
    try {
      const response = await request.post("/orders/cart", reqBody);
      return response.data;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: error.message,
      });
    }
  };
}
