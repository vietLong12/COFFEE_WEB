import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DropDown from "../common/DropDown";
import { AddressService } from "../../service/AddressService";
import { AuthContext } from "../../context/authContext";
import { CropSquare } from "@mui/icons-material";
import { Address } from "../../Types";

const MyAddress = () => {
  const auth = useContext(AuthContext);

  const [isEdit, setEditStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [homeAddress, setHomeAddress] = useState<string | undefined>("");
  const [citySelected, setCitySelected] = useState<number | undefined | string>(
    ""
  );
  const [districtSelected, setDistrictSelected] = useState<
    number | undefined | string
  >(0);
  const [wardSelected, setWardSelected] = useState<number | undefined | string>(
    ""
  );
  console.log({ citySelected, districtSelected, wardSelected });

  const handleAddAddress = () => {
    console.log({
      homeAddress: homeAddress,
      city: citySelected,
      district: districtSelected,
      ward: wardSelected,
    });
    setOpen(!open);
  };

  const handleEditAddress = async (address: Address) => {
    setEditStatus(true);

    console.log("address: ", address);
    if (address) {
      setHomeAddress(address.homeAddress);
      setCitySelected(address.city?.code);
      setDistrictSelected(address.district?.code);
      setWardSelected(address.ward?.code);
      await new Promise((resolve) => setOpen(!open));
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const listCity = await AddressService.getListCity();
        setCity(listCity);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    setDistrictSelected("");
    setWardSelected("");
    const fetchDistricts = async () => {
      try {
        const selectedCity: any = city.find(
          (city: any) => city.code === citySelected
        );

        if (selectedCity) {
          setDistricts(selectedCity.districts);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [citySelected, city]);

  useEffect(() => {
    setWardSelected("");
    const fetchWards = async () => {
      try {
        const selectedCity: any = city.find(
          (city: any) => city.code === citySelected
        );
        const selectedDistrict = selectedCity?.districts.find(
          (district: any) => district.code === districtSelected
        );

        if (selectedDistrict) {
          setWards(selectedDistrict.wards);
        }
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };

    fetchWards();
  }, [districtSelected, citySelected, city]);
  return (
    <div>
      <h2 className="text-2xl uppercase mb-4">địa chỉ của bạn</h2>
      <button
        onClick={() => {
          setEditStatus(false);
          setOpen(!open);
        }}
        className="bg-primary text-white text-sm p-4 py-3 mt-3 up hover:opacity-60 border border-primary duration-200"
      >
        Thêm địa chỉ
      </button>

      <Dialog fullWidth open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>
          {isEdit ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col mb-4">
            <label htmlFor="homeAddress">Địa chỉ:</label>
            <input
              type="text"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              className="border outline-none px-2 py-1 border-slate-300 rounded hover:border-black"
            />
          </div>
          <div className="mb-4">
            <DropDown
              dataSelected={citySelected}
              label="Tỉnh/ Thành phố"
              setValue={setCitySelected}
              value={city}
            />
          </div>
          <div className="mb-4">
            <DropDown
              dataSelected={districtSelected}
              label="Quận/ Huyện"
              setValue={setDistrictSelected}
              value={districts}
            />
          </div>
          <div className="mb-4">
            <DropDown
              dataSelected={wardSelected}
              label="Tỉnh/ Thành phố"
              setValue={setWardSelected}
              value={wards}
            />
          </div>
          <div>
            <input type="checkbox" id="isDefaultAddress" />
            <label htmlFor="isDefaultAddress" className="ml-2 text-sm select-none">Đặt là địa chỉ mặc định?</label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Huỷ</Button>
          <Button onClick={handleAddAddress}>
            {isEdit ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <ul className="pt-6">
          {auth?.userData?.address.map((address, index) => {
            return (
              <li
                className="flex justify-between py-4 border-t pb-6"
                key={index}
              >
                <div className="relative">
                  <span className="font-bold">{`Địa chỉ ${index + 1}: `}</span>
                  {`${address.homeAddress}, ${address.ward?.name}, ${address.district?.name}, ${address.city?.name}`}
                  {address.defaultAddress ? (
                    <div className="absolute top-6 left-0 text-xs text-red-500 flex items-center">
                      <CropSquare sx={{ fontSize: "10px" }} />
                      Địa chỉ mặc định
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex">
                  <p
                    className="mr-4 text-blue-500 hover:text-red-500 cursor-pointer duration-200"
                    onClick={() => handleEditAddress(address)}
                  >
                    Chỉnh sửa địa chỉ
                  </p>
                  <p className="text-red-500 cursor-pointer hover:opacity-50 duration-200">
                    Xoá
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MyAddress;
