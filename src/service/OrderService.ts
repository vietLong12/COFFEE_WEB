import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "./type";

const request = axios.create({
  baseURL: BASE_URL,
});

// @ts-ignore
interface CreateOrderRequest {
  accountId: string;
  customer: {
    username: string;
    email: string;
    address: string;
    phone: string;
  };
  paymentMethod: "cod" | "momo";
}

interface QuerryParamGetData {
  page?: string;
  limit?: string;
  keyword?: string;
  depth?: string;
}

export class OrderService {
  static postOrder = async (req: any) => {
    const response = await request.post(`/orders`, req);
    return response.data;
  };

  static getOrderById = async (id: any) => {
    const response = await request.get(`/orders/${id}`);
    return response.data;
  };

  static getListOrder = async (q: QuerryParamGetData) => {
    try {
      if (q) {
        const page = q.page || "";
        const limit = q.limit || "";
        const keyword = q.keyword || "";
        const depth = q.depth || "3";
        const respone = await request.get(
          `/orders?page=${page}&limit=${limit}&keyword=${keyword}&depth=${depth}`
        );
        return respone.data;
      } else {
        throw { message: "Không tìm thấy đơn hàng của bạn" };
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: error.message,
      });
    }
  };
}
