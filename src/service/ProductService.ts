import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "./type";

const request = axios.create({
  baseURL: BASE_URL,
});

interface QuerryParamGetData {
  page?: string;
  limit?: string;
  keyword?: string;
  depth?: string;
}

export class ProductService {
  static getListProduct = async (q?: QuerryParamGetData) => {
    try {
      if (q) {
        const page = q.page || "";
        const limit = q.limit || "";
        const keyword = q.keyword || "";
        const depth = q.depth || "3";
        const respone = await request.get(
          `/products?page=${page}&limit=${limit}&keyword=${keyword}&depth=${depth}`
        );
        return respone.data;
      } else {
        const respone = await request.get(`/products`);
        return respone.data;
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.message,
      });
    }
  };

  static getListCategory = async () => {
    const response = await request.get(`/products/category`);
    return response.data;
  };
  static getProductById = async (_id: string) => {
    const response = await request.get(`/products/${_id}`);
    return response.data;
  };

  static getListCommentById = async (_id: string) => {
    try {
      const response = await request.get(`/products/rate/${_id}`);
      return response.data;
    } catch (error: any) {
      Swal.fire({ icon: "error", title: error.message });
    }
  };

  static postComment = async (reqBody: any) => {
    try {
      const response = await request.post(`/products/rate`, reqBody);
      return response.data;
    } catch (error: any) {
      Swal.fire({ icon: "error", title: error.message });
    }
  };
}
