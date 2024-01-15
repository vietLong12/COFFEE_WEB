import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "./type";

const request = axios.create({
  baseURL: BASE_URL,
});

interface LoginRequest {
  email: string;
  password: string;
  isRememberMe: boolean;
}

interface LoginTokenRequest {
  token: string;
}

interface LogoutRequest {
  email: string;
}

export class LoginService {
  static loginAccount = async (logReq: LoginRequest) => {
    try {
      const response = await request.post(`/auth/login`, logReq);
      if (response.data.code === 400) {
        throw {
          message: response.data.msg,
        };
      }
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin",
      });
    }
  };

  static logoutAccount = async (logoutReq: LogoutRequest) => {
    const req = {
      email: logoutReq.email,
    };
    const response = await request.post(`/auth/logout`, req);
    return response.data;
  };

  static loginAccountByToken = async (logReq: LoginTokenRequest) => {
    const req = {
      token: logReq,
    };
    const response = await request.post(`/auth/login`, req);
    return response.data;
  };
}
