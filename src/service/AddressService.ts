import axios from "axios";

const request = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
});

export class AddressService {
  static getListCity = async () => {
    const respone = await request.get("/?depth=3");
    return respone.data;
  };
  static getDistrictByCityCode = async (cityCode: string) => {
    const response = await request.get(`/p/${cityCode}?depth=2`);
    return response.data;
  };
  static getWardByDicstrictCode = async (dicstrictCode: string) => {
    const response = await request.get(`/d/${dicstrictCode}?depth=2`);
    return response.data;
  };
  static getListDicstrict = async () => {
    const response = await request.get(`/d`);
    return response.data;
  };
  static getListWard = async () => {
    const response = await request.get(`/w`);
    return response.data;
  };
}
