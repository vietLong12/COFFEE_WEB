import axios from "axios";
import { BASE_URL } from "./type";

const request = axios.create({
  baseURL: BASE_URL,
});

export class ImageUploadService {
  static postImage = async (file: any) => {
    const respone = await request.post("/image", file);
    return respone.data;
  };
}
