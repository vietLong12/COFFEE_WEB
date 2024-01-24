import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import DropDown from "../components/common/DropDown";
import { AddressService } from "../service/AddressService";
import { InputLabel, TextField } from "@mui/material";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Money } from "@mui/icons-material";
import momo from "../assets/icon/momo_icon_square_pinkbg_RGB.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { ProductService } from "../service/ProductService";
import { ProductPayload } from "../redux/action/AddProductToCart";
import { AccountService } from "../service/AccountService";
import { LoginService } from "../service/LoginService";
import { useCookies } from "react-cookie";
import { OrderService } from "../service/OrderService";
import Swal from "sweetalert2";
import SubHeader from "../components/subHeader/SubHeader";

interface FormRef {
  submitForm: () => void;
}
interface OrderReq {
  accountId: string;
  customer: {
    username: string;
    email: string;
    address: string;
    phone: string;
  };
  paymentMethod: "cod" | "momo";
}

const Order = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const auth = useContext(AuthContext);

  const [listAddress, setListAddress] = useState<any[]>([]);

  const [cartData, setCartData] = useState<ProductPayload[]>([]);
  console.log("cartData: ", cartData);

  const [homeAddress, setHomeAddress] = useState("");
  const [wardSelected, setWardSelected] = useState<number | null>(1);
  const [districtSelected, setDistrictSelected] = useState<number | null>(1);
  const [citySelected, setCitySelected] = useState<number | null>(1);

  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  const [isNewAddress, setIsNewAddress] = useState(true);

  const [checkCity, setCheckCity] = useState(false);
  const [indexAddress, setIndexAddress] = useState("other");

  const [couponValue, setCouponValue] = useState("");
  const [freightCost, setFreightCost] = useState("");
  const [noteValue, setNoteValue] = useState("Không có ghi chú");
  const [selectedPayment, setSelectedPayment] = useState<"cod" | "momo">("cod");

  const [addressSelected, setAddressSelected] = useState<any>();

  const handleLogout = async () => {
    if (auth?.userData?.email) {
      const logout = await LoginService.logoutAccount({
        email: auth?.userData?.email,
      });
    }
    auth?.setLoggedIn(false);
    navigate("/");
    removeCookies("token");
  };
  useEffect(() => {
    if ((citySelected && citySelected == 1) || citySelected == 31) {
      setFreightCost("30");
    } else {
      if (citySelected % 2 == 0) {
        setFreightCost("40");
      } else {
        setFreightCost("50");
      }
    }
  }, [citySelected]);

  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    console.log(e.target.value);
    setSelectedPayment(e.target.value);
  };

  const handleSubmitOrder = async () => {
    try {
      if (citySelected && districtSelected && wardSelected) {
        const city = await AddressService.getCity(citySelected);
        const district = await AddressService.getDistrict(districtSelected);
        const ward = await AddressService.getWard(wardSelected);
        const req = {
          accountId: auth?.userData?._id,
          customer: {
            address: `${homeAddress} - ${ward.name} - ${district.name} - ${city.name}`,
            email: auth?.userData?.email,
            phone: auth?.userData?.phone,
            username: auth?.userData?.username,
          },
          paymentMethod: selectedPayment,
          note: noteValue,
          freightCost: freightCost,
        };
        const resOrder = await OrderService.postOrder(req);
        console.log("resOrder: ", resOrder);
        if (resOrder.msg === "Cart is empty") {
          Swal.fire({
            icon: "warning",
            title: "Bạn không có sản phẩm nào trong giỏ hàng",
          });
          navigate("/");
          auth?.setRender(!auth.render);
        }
        if (resOrder.desciption === "order created") {
          auth?.setOrderInfor(resOrder.order);
          Swal.fire({
            icon: "success",
            title: "Bạn đã đặt hàng thành công",
          });
          navigate("/order/alert");
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
    // navigate("/order/alert");
  };

  useEffect(() => {
    if (!(indexAddress === "other")) {
      console.log(listAddress[Number(indexAddress)]);
      setHomeAddress(listAddress[Number(indexAddress)].homeAddress);
      setCitySelected(listAddress[Number(indexAddress)].city.code);
      setDistrictSelected(listAddress[Number(indexAddress)].district.code);
      setWardSelected(listAddress[Number(indexAddress)].ward.code);
      setIsNewAddress(false);
    } else {
      setHomeAddress("");
      setIsNewAddress(true);
    }
  }, [indexAddress]);

  useEffect(() => {
    const fetchData = async () => {
      if (auth?.userData?._id) {
        const account = await AccountService.getAccountById(
          auth?.userData?._id
        );
        if (account) {
          setListAddress(account.data.address);
          setCartData(auth?.cart);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const listCity = await AddressService.getAll();
        setCity(listCity);
        const districts = listCity.filter((c: any) => c.code === citySelected);
        setDistrict(districts[0].districts);
        const wards = districts[0].districts.filter(
          (c: any) => c.code === districtSelected
        );
        setWard(wards[0]?.wards);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [citySelected, districtSelected, wardSelected, indexAddress]);

  return (
    <div className="">
      <SubHeader heading="Đặt hàng" />
      <div className="w-8/12 px-0 mx-auto gap-6 py-10 mb-4">
        <div className="">
          <p className="font-bold text-center text-2xl uppercase">
            Thông tin nhận hàng
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-6">
          <div className="">
            <h6 className="font-bold text-lg mb-2">1. Thông tin cá nhân</h6>
            <div className="overflow-hidden">
              <InputLabel color="primary" id="demo-simple-select-helper-label">
                Danh sách địa chỉ
              </InputLabel>
              <select
                name="selectAddreess"
                id="listAddress"
                className="overflow-hidden border-2 py-1 px-1 w-full"
                onChange={(e) => setIndexAddress(e.target.value)}
              >
                <option value="other" className="">
                  1. Địa chỉ mới
                </option>
                {listAddress?.map((address, index) => (
                  <option value={index} key={index} className="">
                    {`${index + 2}. ${address.homeAddress}, ${
                      address.ward?.name
                    }, ${address.district?.name}, ${address.city?.name}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2 flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={auth?.userData?.email}
                disabled
                className="border w-full py-1 rounded hover:border-black px-1"
              />
            </div>

            <div className="mb-2 flex-col">
              <label htmlFor="email">Tên người dùng</label>
              <input
                type="text"
                id="email"
                value={auth?.userData?.username}
                disabled
                className="border w-full py-1 rounded hover:border-black px-1"
              />
            </div>

            <div className="mb-2 flex-col">
              <label htmlFor="email">Phone</label>
              <input
                type="text"
                id="email"
                value={auth?.userData?.phone}
                disabled
                className="border w-full py-1 rounded hover:border-black px-1"
              />
            </div>
            <div className="mb-2 flex-col">
              <label htmlFor="homeAddress">Địa chỉ</label>
              <input
                type="text"
                id="homeAddress"
                disabled={!isNewAddress}
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                className="border w-full py-1 rounded hover:border-black px-1"
              />
            </div>

            <div className="mb-2">
              <DropDown
                label="Tỉnh/Thành phố"
                onSelect={(w) => setCitySelected(w)}
                options={city}
                disabled={!isNewAddress}
                defaultValue={citySelected}
              />
              {checkCity ? (
                <div className="text-sm text-red-900">
                  Vui lòng chọn tỉnh/thành phố
                </div>
              ) : null}
            </div>
            <div className="mb-2">
              <DropDown
                label="Quận/Huyện"
                defaultValue={districtSelected}
                disabled={!isNewAddress}
                onSelect={(w) => setDistrictSelected(w)}
                options={district}
              />
            </div>
            <div className="mb-2">
              <DropDown
                disabled={!isNewAddress}
                label="Phường/Xã"
                onSelect={(w) => setWardSelected(w)}
                options={ward}
                defaultValue={wardSelected}
              />
            </div>
            <div className="text-input mb-2">
              <InputLabel color="primary" id="demo-simple-select-helper-label">
                Ghi chú
              </InputLabel>
              <div className="hidden-label mt-1">
                <TextField
                  onChange={(e) => setNoteValue(e.target.value)}
                  className="w-full"
                  defaultValue={""}
                  value={noteValue}
                  id="outlined-required"
                  label="Required"
                />
              </div>
            </div>
          </div>
          <div className="">
            <h6 className="font-bold text-lg mb-2">
              2. Vận chuyển và thanh toán
            </h6>
            <div>
              <div className="mb-6">
                <p className="font-bold mb-4">Vận chuyển</p>
                <div className="bg-blue-100 p-4">
                  {freightCost ? (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="freightCost"
                        className="mr-2"
                        id="freight-cost"
                        defaultChecked={true}
                      />
                      <div className="flex justify-between w-full">
                        <label htmlFor="freight-cost" className="w-fit">
                          Giao hàng tận nơi
                        </label>
                        <p className="mr-4">{freightCost}.000đ</p>
                      </div>
                    </div>
                  ) : (
                    "Vui lòng nhập thông tin giao hàng"
                  )}
                </div>
              </div>
              <div>
                <p className="font-bold mb-4">Thanh toán</p>
                <div className="flex border p-4 pe-8 mb-4 border-blue-600">
                  <input
                    type="radio"
                    name="radio-pay"
                    id="radio-pay-1"
                    className="mr-2 w-3"
                    value="cod"
                    checked={selectedPayment === "cod"}
                    onChange={(e) => handlePaymentChange(e)}
                  />
                  <label
                    htmlFor="radio-pay-1"
                    className="flex justify-between w-full"
                  >
                    Thanh toán khi giao hàng (COD)
                    <Money />
                  </label>
                </div>
                <div className="flex border p-4 pe-8 border-blue-600">
                  <input
                    type="radio"
                    name="radio-pay"
                    id="radio-pay-2"
                    className="mr-2 w-3"
                    value="momo"
                    checked={selectedPayment === "momo"}
                    onChange={(e) => handlePaymentChange(e)}
                  />
                  <label
                    htmlFor="radio-pay-2"
                    className="flex items-center justify-between w-full"
                  >
                    Thanh toán qua Momo
                    <img src={momo} alt="" width={20} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h6 className="font-bold text-lg mb-2">3. Thông tin đơn hàng</h6>
            <div className="bg-zinc-50 p-6">
              <h1>Đơn hàng ({cartData?.length} sản phẩm)</h1>
              <ul className="mt-4 border-t pt-4">
                {cartData?.map((item, index) => {
                  return (
                    <li
                      className="flex items-center mb-4 border-b pb-4 w-full justify-between"
                      key={index}
                    >
                      <div className="relative mr-5">
                        <img src={item.img} alt="" width={50} />
                        <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="w-2/4">
                        <p className="font-semibold">{item.productName}</p>
                        <p className="text-sm uppercase">{item.size}</p>
                        <p className="text-sm ">Ghi chú: {item.note}</p>
                      </div>
                      <div className="text-sm">{item.total}.000đ</div>
                    </li>
                  );
                })}
              </ul>
              <div className="grid grid-cols-4 gap-4 pb-4 border-b">
                <div className="col-span-3 ">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="w-full p-2 outline-blue-500 rounded-md  border"
                    onChange={(e) => setCouponValue(e.target.value)}
                  />
                </div>
                <button
                  className={`${
                    couponValue != ""
                      ? " bg-blue-500 hover:bg-blue-300"
                      : "bg-blue-200"
                  } duration-200 rounded-md text-white`}
                  disabled={couponValue == ""}
                >
                  Áp dụng
                </button>
              </div>
              <div className="pb-4 border-b pt-2">
                <div className="flex justify-between mb-2">
                  Tạm tính{" "}
                  <span>
                    {cartData.reduce((acc, item) => acc + item.total, 0)
                      ? cartData.reduce((acc, item) => acc + item.total, 0) +
                        ".000đ"
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  Phí vận chuyển{" "}
                  {freightCost != "" ? <span>{freightCost}.000đ</span> : ""}
                </div>
              </div>
              <div className="py-4">
                <div className="flex justify-between text-xl px-4 items-center">
                  Tổng cộng{" "}
                  <span className="font-bold text-2xl">
                    {cartData.reduce((acc, item) => acc + item?.total, 0)
                      ? cartData.reduce((acc, item) => acc + item?.total, 0) +
                        Number(freightCost) +
                        ".000đ"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p
                  className="text-blue-500 font-semibold cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  {"<"} Quay về trang chủ
                </p>
                <button
                  type="submit"
                  className="bg-blue-700 rounded-md text-white py-3 px-5 hover:bg-blue-900 duration-200"
                  onClick={() => handleSubmitOrder()}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
