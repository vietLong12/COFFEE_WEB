import axios from "axios";
import Swal from "sweetalert2";
import { Address } from "../Types";

const request = axios.create({
  baseURL: "http://localhost:5500",
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
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: error.message,
      });
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
}
