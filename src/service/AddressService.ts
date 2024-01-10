import axios from "axios";

const request = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
});

export class AddressService {
  static getAll = async () => {
    const respone = await request.get("/?depth=3");
    return respone.data;
  };
  static getDistrictByCityCode = async (cityCode: string) => {
    const response = await request.get(`/p/${cityCode}?depth=3`);
    return response.data;
  };
  static getWardByDicstrictCode = async (dicstrictCode: string) => {
    const response = await request.get(`/d/${dicstrictCode}?depth=2`);
    return response.data;
  };

  static getListCity = async () => {
    const response = await request.get(`/`);
    return response.data;
  };

  static getCity = async (city: number) => {
    const response = await request.get(`/p/${city}`);
    return response.data;
  };

  static getDistrict = async (district: number) => {
    const response = await request.get(`/d/${district}`);
    return response.data;
  };
  static getWard = async (ward: number) => {
    const response = await request.get(`/w/${ward}`);
    return response.data;
  };
}
