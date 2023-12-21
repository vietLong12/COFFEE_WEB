import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";
import DropDown from "../components/common/DropDown";
import { AddressService } from "../service/AddressService";
import { InputLabel, TextField } from "@mui/material";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

const Order = () => {
  const auth = useContext(AuthContext);
  const [city, setCity] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [districtSelected, setDistrictSelected] = useState("");
  const [district, setDistrict] = useState([]);

  const [wardSelected, setWardSelected] = useState("");
  const [ward, setWard] = useState([]);

  const [noteValue, setNoteValue] = useState("");
  const submitForm = useRef(null);
  console.log("submitForm: ", submitForm);
  const [bill, setBill] = useState();
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

  const TextEmailInput = ({ field, form, ...props }) => {
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

  const TextAddressInput = ({ field, form, ...props }) => {
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

  const TextPhoneInput = ({ field, form, ...props }) => {
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

  const TextNameInput = ({ field, form, ...props }) => {
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
  return (
    <div className="z-50 fixed top-0 left-0 bottom-0 right-0 bg-white">
      <div className="w-4/5 grid grid-cols-3 mx-auto">
        <div>
          <h1>Coffee Monster</h1>
          <div>
            <p>Thông tin nhận hàng</p>
            <p>{auth?.isLoggedIn ? "Đăng nhập" : "Đăng xuất"}</p>
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
                        component={TextNameInput}
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
                      component={TextPhoneInput}
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
                      component={TextAddressInput}
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
        <div></div>
        <div>
          <button
            type="submit"
            onClick={() => console.log(submitForm.current.submitForm())}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
