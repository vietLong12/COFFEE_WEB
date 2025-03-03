import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
// @ts-ignore
import React, { useContext, useEffect, useState } from "react";
import DropDown from "../common/DropDown";
import { AddressService } from "../../service/AddressService";
import { AuthContext } from "../../context/authContext";
import { CropSquare } from "@mui/icons-material";
// @ts-ignore

import { Address } from "../../Types";
import { AccountService } from "../../service/AccountService";
import Swal from "sweetalert2";

const MyAddress = () => {
  const auth = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [isEdit, setEditStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [homeAddress, setHomeAddress] = useState<string | undefined>("");
  const [citySelected, setCitySelected] = useState<number | string>("1");
  const [districtSelected, setDistrictSelected] = useState<number | string>(
    "1"
  );
  const [wardSelected, setWardSelected] = useState<number | string>("1");
  const [idEdit, setIdEdit] = useState<number>(-1);

  const handleDeleteAddress = async (index: number) => {
    auth?.userData?.address.splice(index, 1);
    const req = {
      user_id: auth?.userData?._id,
      address: auth?.userData?.address,
    };
    auth?.setUserData({ ...auth.userData, address: req.address });
    // @ts-ignore
    const account = await AccountService.putAccount(req);
  };

  const handleAddAddress = async () => {
    let city = await AddressService.getListProvince();
    city = city.filter((c) => c.code == citySelected)[0];
    let district = await AddressService.getListDistrictByProvinceId(
      citySelected
    );
    district = district.filter((d) => d.code == districtSelected)[0];
    let ward = await AddressService.getListWardByDistrictId(districtSelected);
    ward = ward.filter((w) => w.code == wardSelected)[0];
    const dataReq = {
      homeAddress,
      city: {
        code: city.code,
        name: city.name,
      },
      district: {
        code: district.code,
        name: district.name,
      },
      ward: {
        code: ward.code,
        name: ward.name,
      },
      defaultAddress: checked,
    };

    if (auth?.userData != null) {
      if (!isEdit) {
        const address = auth?.userData?.address.map((item) => {
          if (checked) {
            item.defaultAddress = false;
          }
          return item;
        });
        address?.push(dataReq);
        const req = {
          user_id: auth?.userData?._id,
          address: address,
        };
        auth?.setUserData({ ...auth.userData, address: req.address });
        const account = await AccountService.putAccount(req);
        Swal.fire({
          icon: account.status,
          text: "Thêm địa chỉ thành công",
        });
        setOpen(!open);
      } else {
        const address = [...auth?.userData.address];
        address[idEdit] = {
          homeAddress: dataReq.homeAddress,
          city: dataReq.city,
          district: dataReq.district,
          ward: dataReq.ward,
          defaultAddress: dataReq.defaultAddress,
        };
        const req = {
          user_id: auth?.userData?._id,
          address: address,
        };
        auth?.setUserData({ ...auth.userData, address: req.address });
        if (req.user_id) {
          const account = await AccountService.putAccount(req);
          setOpen(false);
          Swal.fire({
            icon: account.status,
            text: "Sửa địa chỉ thành công",
          });
        }
      }
    }
  };

  const handleEditAddress = async (address: any, index: number) => {
    setEditStatus(true);
    setOpen(!open);
    setHomeAddress(address.homeAddress);
    setChecked(address?.defaultAddress);
    setCitySelected(address.city?.code.toString().replace(/\b(\d)\b/g, "0$1"));
    setDistrictSelected(
      address.district?.code.toString().replace(/\b(\d)\b/g, "0$1")
    );
    setWardSelected(address.ward?.code.toString().replace(/\b(\d)\b/g, "0$1"));
    setIdEdit(index);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const listCity = await AddressService.getListProvince();
        const listDistrict = await AddressService.getListDistrictByProvinceId(
          citySelected?.toString() ? citySelected?.toString() : ""
        );
        const listWard = await AddressService.getListWardByDistrictId(
          districtSelected?.toString() ? districtSelected.toString() : ""
        );
        setCity(listCity);
        setDistricts(listDistrict);
        setWards(listWard);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [citySelected, districtSelected, wardSelected]);

  return (
    <div>
      <h2 className="text-2xl uppercase mb-4">địa chỉ của bạn</h2>
      <button
        onClick={() => {
          setEditStatus(false);
          setHomeAddress("");
          setCitySelected(1);
          setDistrictSelected(1);
          setWardSelected(1);
          setOpen(!open);
        }}
        className="bg-primary text-white text-sm p-4 py-3 mt-3 up hover:opacity-60 border border-primary duration-200 rounded"
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
              // @ts-ignore
              onSelect={(city) => setCitySelected(city)}
              // @ts-ignore
              defaultValue={citySelected}
              label="Tỉnh/Thành phố"
              options={city}
            />
          </div>
          <div className="mb-4">
            <DropDown
              // @ts-ignore
              onSelect={(d) => setDistrictSelected(d)}
              label="Quận/Huyện"
              // @ts-ignore
              defaultValue={districtSelected}
              options={districts}
            />
          </div>

          <div className="mb-4">
            <DropDown
              // @ts-ignore
              defaultValue={wardSelected}
              // @ts-ignore
              onSelect={(w) => setWardSelected(w)}
              label="Phường/Xã"
              options={wards}
            />
          </div>

          {/* <div className="mb-4">
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
          </div> */}
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
                    onClick={() => handleEditAddress(address, index)}
                  >
                    Chỉnh sửa địa chỉ
                  </p>
                  <p
                    className="text-red-500 cursor-pointer hover:opacity-50 duration-200"
                    onClick={() => handleDeleteAddress(index)}
                  >
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
