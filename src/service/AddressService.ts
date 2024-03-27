import axios from "axios";

const request = axios.create({
  baseURL: "https://vapi.vnappmob.com/api/province/",
});

export class AddressService {
  static getListProvince = async () => {
    const respone = await request.get("");
    let cities = respone.data.results;
    const mapCity = cities.map((c) => {
      return { name: c.province_name, code: c.province_id };
    });
    return mapCity;
  };
  static getListDistrictByProvinceId = async (provinceId: string | number) => {
    const respone = await request.get("district/" + provinceId);
    let district = respone.data.results;
    const mapDistrict = district.map((c) => {
      return { name: c.district_name, code: "" + c.district_id };
    });
    return mapDistrict;
  };
  static getListWardByDistrictId = async (districtId: string | number) => {
    const respone = await request.get("ward/" + districtId);
    let wards = respone.data.results;
    const mapWards = wards.map((c) => {
      return { name: c.ward_name, code: c.ward_id };
    });
    return mapWards;
  };
}
