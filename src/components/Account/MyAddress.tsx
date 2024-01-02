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

  const [checked, setChecked] = useState(false);
  const [isEdit, setEditStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [homeAddress, setHomeAddress] = useState<string | undefined>("");
  const [citySelected, setCitySelected] = useState<number | undefined | string>(
    0
  );
  const [districtSelected, setDistrictSelected] = useState<
    number | undefined | string
  >(0);
  const [wardSelected, setWardSelected] = useState<number | undefined | string>(
    0
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
    setChecked(address.defaultAddress);
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
    const fetchDistricts = async () => {
      try {
        const listDistrict = await AddressService.getDistrictByCityCode(
          citySelected
        );
        console.log("listDistrict[0].districts: ", listDistrict);
        setDistricts(listDistrict.districts);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [citySelected]);

  useEffect(() => {
    const fetchWards = async () => {
      const listWards = await AddressService.getWardByDicstrictCode(
        districtSelected
      );
      console.log("listWards: ", listWards);
      try {
        setWards(listWards.wards);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };

    fetchWards();
  }, [districtSelected, citySelected]);
  return (
    <div>
      <h2 className="text-2xl uppercase mb-4">địa chỉ của bạn</h2>
      <button
        onClick={() => {
          setEditStatus(false);
          setHomeAddress("");
          setCitySelected(0);
          setDistrictSelected(0);
          setWardSelected(0);
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
              label="Tỉnh/Thành phố"
              setValue={setCitySelected}
              value={city}
            />
          </div>
          <div className="mb-4">
            <DropDown
              dataSelected={districtSelected}
              label="Quận/Huyện"
              setValue={setDistrictSelected}
              value={districts}
            />
          </div>
          <div className="mb-4">
            <DropDown
              dataSelected={wardSelected}
              label="Xã/Phường"
              setValue={setWardSelected}
              value={wards}
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="isDefaultAddress"
              onChange={() => setChecked(!checked)}
              checked={checked}
            />
            <label
              htmlFor="isDefaultAddress"
              className="ml-2 text-sm select-none"
            >
              Đặt là địa chỉ mặc định?
            </label>
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
                className="flex xl:flex-row flex-col justify-between py-4 pt-6 border-t pb-6"
                key={index}
              >
                <div className="relative">
                  <span className="font-bold">{`Địa chỉ ${index + 1}: `}</span>
                  {`${address.homeAddress}, ${address.ward?.name}, ${address.district?.name}, ${address.city?.name}`}
                  {address.defaultAddress ? (
                    <div className="absolute -top-4 left-0 text-xs text-red-500 flex items-center">
                      <CropSquare sx={{ fontSize: "10px" }} />
                      Địa chỉ mặc định
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex xl:mt-0 mt-2">
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
