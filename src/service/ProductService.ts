import Swal from "sweetalert2";
import axios, { AxiosResponse } from "axios";
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
  static async getListProduct(q?: QuerryParamGetData) {
    try {
      const { page = "", limit = "", keyword = "", depth = "3" } = q || {};
      const response: AxiosResponse = await request.get(
        `/products?page=${page}&limit=${limit}&keyword=${keyword}&depth=${depth}`
      );
      return response.data;
    } catch (error) {
      ProductService.handleApiError(error);
    }
  }

  static async getListCategory() {
    try {
      const response: AxiosResponse = await request.get("/products/category");
      return response.data;
    } catch (error) {
      ProductService.handleApiError(error);
    }
  }

  static async getProductById(_id: string) {
    try {
      const response: AxiosResponse = await request.get(`/products/${_id}`);
      return response.data;
    } catch (error) {
      ProductService.handleApiError(error);
    }
  }

  static async getListCommentById(_id: string) {
    try {
      const response: AxiosResponse = await request.get(
        `/products/rate/${_id}`
      );
      return response.data;
    } catch (error) {
      ProductService.handleApiError(error);
    }
  }

  static async postComment(reqBody: any) {
    try {
      const response: AxiosResponse = await request.post(
        "/products/rate",
        reqBody
      );
      return response.data;
    } catch (error) {
      ProductService.handleApiError(error);
    }
  }

  private static handleApiError(error: any) {
    Swal.fire({
      icon: "warning",
      title: "Bad Request",
      text:
        error.message === "Request failed with status code 400"
          ? "Đường dẫn không hợp lệ"
          : error.message,
    });
  }
}
