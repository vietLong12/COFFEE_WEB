import { Link, useNavigate } from "react-router-dom";
import fb from "../assets/icon/fb-btn.svg";
import gg from "../assets/icon/gp-btn.svg";
import { FormikHelpers } from "formik/dist/types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { AccountService } from "../service/AccountService";
import SubHeader from "../components/subHeader/SubHeader";

interface Values {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const initValue = {
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Họ quá ngắn")
    .max(10, "Họ quá dài")
    .required("Đây là bắt buộc"),
  lastName: Yup.string()
    .min(1, "Tên quá ngắn")
    .max(10, "Tên quá dài")
    .required("Đây là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu tối thiểu phải là 6 kí tự")
    .max(12, "Mật khẩu phải nhỏ hơn 12 kí tự")
    .required("Đây là bắt buộc"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Đây là bắt buộc"),
});

const Login = () => {
  const inputFirstName = useRef(null);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const handleSubmitForm = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    const req = {
      email: values.email,
      username: `${values.firstName} ${values.lastName}`,
      password: values.password,
      phone: values.phone,
    };

    const account = await AccountService.createAccount(req);
    if (account) {
      resetForm();
      navigate("/login");
      setSubmitting(true);
    }
  };
  return (
    <div className="bg-black">
      <SubHeader heading="Đăng ký tài khoản" />
      <div className="bg-white py-10">
        <Formik
          initialValues={initValue}
          onSubmit={handleSubmitForm}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => (
            <Form
              action=""
              className="bg-white lg:w-2/5 xl:w-1/5 mx-auto p-7 shadow-2xl"
            >
              <h2 className="uppercase text-2xl font-medium text-center">
                {" "}
                Đăng ký
              </h2>
              <p className="text-sm mt-2 mb-5 text-center">
                Đã có tài khoản, đăng nhập
                <Link to="/login" className="underline">
                  {" "}
                  tại đây
                </Link>
              </p>
              <div className="w-full mb-3">
                <Field
                  innerRef={inputFirstName}
                  className="bg-green-50 px-2 py-3 w-full outline-none"
                  type="text"
                  name="firstName"
                  placeholder="Họ"
                />
                {errors.firstName && touched.firstName ? (
                  <div className="text-sm text-red-700">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="w-full mb-3">
                <Field
                  className="bg-green-50 px-2 py-3 w-full outline-none"
                  type="text"
                  name="lastName"
                  placeholder="Tên"
                />
                {errors.lastName && touched.lastName ? (
                  <div className="text-sm text-red-700">{errors.lastName}</div>
                ) : null}
              </div>

              <div className="w-full mb-3">
                <Field
                  className="bg-green-50 px-2 py-3 w-full outline-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <div className="text-sm text-red-700">{errors.email}</div>
                ) : null}
              </div>
              <div className="w-full mb-3">
                <Field
                  className="bg-green-50 px-2 py-3 w-full outline-none"
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                />
                {errors.phone && touched.phone ? (
                  <div className="text-sm text-red-700">{errors.phone}</div>
                ) : null}
              </div>
              <div className="w-full mb-3">
                <Field
                  className="bg-green-50 px-2 py-3 w-full outline-none"
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                />
                {errors.password && touched.password ? (
                  <div className="text-sm text-red-700">{errors.password}</div>
                ) : null}
                <div className="flex mb-3">
                  <input
                    type="checkbox"
                    name=""
                    id="check"
                    className="mr-1"
                    checked={showPass}
                    onChange={() => setShowPass(!showPass)}
                  />
                  <label htmlFor="check" className="select-none">
                    Hiện mật khẩu
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mb-4 bg-black text-white w-full py-2 font-semibold duration-100 border hover:bg-white hover:border-black hover:text-black"
                onClick={() => {
                  if (errors) {
                    inputFirstName.current.focus();
                  }
                }}
              >
                {" "}
                Đăng ký
              </button>
              <p className="text-sm text-center">Hoặc đăng nhập bằng</p>
              <div className="flex items-center justify-center mt-4">
                <a href="" className="block w-2/5 mr-2">
                  <img src={fb} alt="" />
                </a>
                <a href="" className="block w-2/5">
                  <img src={gg} alt="" />
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
