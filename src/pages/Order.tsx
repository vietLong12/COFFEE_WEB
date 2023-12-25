import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";
import DropDown from "../components/common/DropDown";
import { AddressService } from "../service/AddressService";
import { InputLabel, TextField } from "@mui/material";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Money } from "@mui/icons-material";
import momo from "../assets/icon/momo_icon_square_pinkbg_RGB.png";
import { useNavigate } from "react-router-dom";
import data from "../data/data";

interface FormRef {
  submitForm: () => void;
}

const Order = () => {
  const auth = useContext(AuthContext);
  const [city, setCity] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [districtSelected, setDistrictSelected] = useState("");
  const [district, setDistrict] = useState([]);
  const [checkCity, setCheckCity] = useState(false);

  const [wardSelected, setWardSelected] = useState("");
  const [ward, setWard] = useState([]);

  const [couponValue, setCouponValue] = useState("");
  const [freightCost, setFreightCost] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [bill, setBill] = useState();
  const submitForm = useRef(null);

  const [selectedPayment, setSelectedPayment] = useState("cod");

  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    console.log(e.target.value);

    setSelectedPayment(e.target.value);
  };

  const handleSubmitOrder = () => {
    if (citySelected == "") {
      setCheckCity(true);
    }
    if (
      submitForm.current != null &&
      citySelected != "" &&
      submitForm.current.isValid
    ) {
      console.log(submitForm.current.submitForm());
      navigate("/order/alert")
    }
  };
  useEffect(() => {
    switch (citySelected.toString()) {
      case "":
        setFreightCost("");
        break;
      case "1":
        setFreightCost("40");
        break;
      default:
        setFreightCost("50");
        break;
    }
  }, [citySelected, districtSelected, wardSelected]);

  useEffect(() => {
    if (citySelected != "") {
      setCheckCity(false);
    }
  }, [citySelected]);

  useEffect(() => {
    AddressService.getListCity().then((listCity) => {
      if (listCity) {
        listCity = listCity.map((city: any) => {
          return {
            value: city.name,
            code: city.code,
          };
        });
        setCity(listCity);
      }
    });
  }, []);
  useEffect(() => {
    AddressService.getDistrictByCityCode(citySelected).then((listDistrict) => {
      let data = listDistrict.districts;
      if (data) {
        data = data.map((district: any) => {
          return {
            value: district.name,
            code: district.code,
          };
        });
        setDistrict(data);
      }
    });
  }, [citySelected]);
  useEffect(() => {
    AddressService.getWardByDicstrictCode(districtSelected).then((listWard) => {
      let data = listWard.wards;
      if (data) {
        data = data.map((ward: any) => {
          return {
            value: ward.name,
            code: ward.code,
          };
        });
        setWard(data);
      }
    });
  }, [districtSelected]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("*Hãy cho chúng tôi biết tên của bạn."),
    phone: Yup.string()
      .required("Vui lòng để lại số điện thoại")
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Hãy kiểm tra lại số điện thoại"
      ),
    email: Yup.string()
      .email("*Email không hợp lệ")
      .required("*Email là bắt buộc")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "*Email không hợp lệ"),
    address: Yup.string().required("Hãy cho chúng tôi biết địa chỉ của bạn."),
  });

  const TextEmailInput = ({ field, form, ...props }: any) => {
    return (
      <TextField
        {...field}
        {...props}
        className="w-full"
        id="outlined-required"
        label="Required"
      />
    );
  };

  const getImageProductByIdProduct = (productId: number) => {
    return data.filter((item) => item.id === productId)[0].img;
  };
  return (
    <div className="z-50 fixed top-0 left-0 bottom-0 right-0 bg-white">
      <div className="w-3/4 grid grid-cols-3 mx-auto gap-6">
        <div className="mt-6">
          <h1 className="text-blue-600 text-3xl mb-4 font-semibold">
            Monster Coffee
          </h1>
          <div className="flex justify-between">
            <p className="font-bold">Thông tin nhận hàng</p>
            <p className="text-blue-600 font-bold">
              {!auth?.isLoggedIn ? "Đăng nhập" : "Đăng xuất"}
            </p>
          </div>
          <Formik
            innerRef={submitForm}
            initialValues={{
              email: "",
              name: "",
              phone: "",
              address: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              console.log({
                ...values,
                name: values.name.trim(),
                noteValue,
                citySelected,
                districtSelected,
                wardSelected,
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <div className="text-input mb-2 mt-4">
                    <InputLabel
                      color="primary"
                      id="demo-simple-select-helper-label"
                    >
                      Email
                    </InputLabel>
                    <div className="hidden-label mt-1">
                      <Field
                        name="email"
                        type="email"
                        component={TextEmailInput}
                      />
                    </div>
                    {errors.email && touched.email ? (
                      <div className="text-sm text-red-900">{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="text-input mb-2">
                    <InputLabel
                      color="primary"
                      id="demo-simple-select-helper-label"
                    >
                      Họ và tên
                    </InputLabel>
                    <div className="hidden-label mt-1">
                      <Field
                        name="name"
                        type="text"
                        component={TextEmailInput}
                      />
                    </div>
                    {errors.name && touched.name ? (
                      <div className="text-sm text-red-900">{errors.name}</div>
                    ) : null}
                  </div>
                </div>

                <div className="text-input mb-2">
                  <InputLabel
                    color="primary"
                    id="demo-simple-select-helper-label"
                  >
                    Số điện thoại
                  </InputLabel>
                  <div className="hidden-label mt-1">
                    <Field
                      name="phone"
                      type="text"
                      component={TextEmailInput}
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-sm text-red-900">{errors.phone}</div>
                    ) : null}
                  </div>
                </div>

                <div className="text-input mb-2">
                  <InputLabel
                    color="primary"
                    id="demo-simple-select-helper-label"
                  >
                    Địa chỉ
                  </InputLabel>
                  <div className="hidden-label mt-1">
                    <Field
                      name="address"
                      type="text"
                      component={TextEmailInput}
                    />
                    {errors.address && touched.address ? (
                      <div className="text-sm text-red-900">
                        {errors.address}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mb-2">
                  <DropDown
                    label="Tỉnh/Thành phố"
                    setValue={setCitySelected}
                    value={city}
                    dataSelected={citySelected}
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
                    setValue={setDistrictSelected}
                    value={district}
                    dataSelected={districtSelected}
                  />
                </div>
                <div className="mb-2">
                  <DropDown
                    label="Phường/Xã"
                    setValue={setWardSelected}
                    value={ward}
                    dataSelected={wardSelected}
                  />
                </div>
                <div className="text-input mb-2">
                  <InputLabel
                    color="primary"
                    id="demo-simple-select-helper-label"
                  >
                    Ghi chú
                  </InputLabel>
                  <div className="hidden-label mt-1">
                    <TextField
                      onChange={(e) => setNoteValue(e.target.value)}
                      className="w-full"
                      id="outlined-required"
                      label="Required"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-6">
          <h1 className="text-blue-600 text-3xl mb-4 font-semibold text-transparent">
            transparent
          </h1>
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
        <div className="bg-zinc-50 p-6">
          <h1>Đơn hàng ({auth?.cart?.length} sản phẩm)</h1>
          <ul className="mt-4 border-t pt-4">
            {auth?.cart?.map((item, index) => {
              return (
                <li
                  className="flex items-center mb-4 border-b pb-4 w-full justify-between"
                  key={index}
                >
                  <div className="relative mr-5">
                    <img src={momo} alt="" width={50} />
                    <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                      1
                    </span>
                  </div>
                  <div className="w-2/4">
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm uppercase">{item.size}</p>
                    <p className="text-sm ">Ghi chú: {item.note}</p>
                  </div>
                  <div className="text-sm">{item.price}.000đ</div>
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
                {auth?.cart?.reduce((acc, item) => acc + item.price, 0)
                  ? auth?.cart?.reduce((acc, item) => acc + item.price, 0) +
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
                {auth?.cart?.reduce((acc, item) => acc + item.price, 0)
                  ? auth?.cart?.reduce((acc, item) => acc + item.price, 0) +
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
  );
};

export default Order;
