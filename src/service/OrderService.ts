import Swal from "sweetalert2";
import { GetProductListResponse } from "./../Types/ResponseType";
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5500",
});

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
  static postOrder = async () => {
    const response = await request.post(`/orders`);
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
