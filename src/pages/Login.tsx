// @ts-nocheck
import fb from "../assets/icon/fb-btn.svg";
import gg from "../assets/icon/gp-btn.svg";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import SubHeader from "../components/subHeader/SubHeader";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";
import { LoginService } from "../service/LoginService";
import { UserTransfer } from "../Types";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../service/type";
import axios from "axios";

interface Values {
  email: string;
  password: string;
  isRememberMe: boolean;
}

const initValue = {
  email: "",
  password: "",
  isRememberMe: false,
};

const Login = () => {
  const auth = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const inputEmailRef = useRef(null);
  const handleSubmitVerifyCode = (email: string) => {
    Swal.fire({
      title: "Nhập mã xác nhận của bạn",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      showLoaderOnConfirm: true,
      preConfirm: async (verifyCode) => {
        try {
          const url = `${BASE_URL}/auth/password`;
          const req = {
            email: email,
            verifyCode: verifyCode,
          };
          const response = await axios.post(url, req);
          return;
        } catch (error: any) {
          if (error.response.data.code === 400) {
            Swal.showValidationMessage(
              "Mã xác nhận không đúng. Vui lòng kiểm tra lại."
            );
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Mật khẩu mới đã được gửi đến email của bạn",
        });
      }
    });

    // Thêm phần đếm ngược 2 phút
    let countdown = 120; // Đếm ngược từ 120 giây (2 phút)
    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        Swal.close(); // Đóng Swal sau khi đếm ngược kết thúc
      } else {
        Swal.getTitle().innerHTML = `Nhập mã xác nhận của bạn  <br/> (${countdown} giây còn lại)`;
      }
    }, 1000);
  };

  const handleFindPassword = () => {
    Swal.fire({
      title: "Nhập email của bạn",
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Tìm mật khẩu",
      showLoaderOnConfirm: true,
      preConfirm: async (emailValue) => {
        try {
          const url = `
            ${BASE_URL}/auth/find
          `;
          const req = {
            email: emailValue,
          };
          const response = await axios.post(url, req);
          return;
        } catch (error: any) {
          if (error.response.data.description === "Invalid input data") {
            Swal.showValidationMessage(`
            Email không hợp lệ...
          `);
          }
          if (error.response.data.msg == "account not found") {
            Swal.showValidationMessage(`
            Không tìm thấy email...
          `);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: `Một email đã được gửi đến ${result.value} vui lòng kiểm tra`,
        });
        handleSubmitVerifyCode(result.value);
      }
    });
  };

  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "* Mật khẩu tối thiểu phải là 6 kí tự")
      .max(12, "* Mật khẩu phải nhỏ hơn 12 kí tự")
      .required("* Đây là bắt buộc"),
    email: Yup.string()
      .email("* Email không hợp lệ")
      .required("* Đây là bắt buộc"),
  });

  const handleSubmitForm = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const res = await LoginService.loginAccount(values);
    if (res?.code === 200) {
      const user: UserTransfer = {
        address: res.account.address,
        email: res.account.email,
        phone: res.account.phone,
        username: res.account.username,
        _id: res.account._id,
        avatar: res.account.avatar,
      };
      if (res.account.token != null) {
        setCookie("token", res.account.token);
      }
      navigate("/");
      auth?.setLoggedIn(true);
      auth?.setUserData(user);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      <SubHeader heading={"Đăng nhập"} />
      <div className="bg-white py-10">
        <Formik
          initialValues={initValue}
          onSubmit={handleSubmitForm}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => {
            useEffect(() => {
              if (errors.email && touched.email) {
                inputEmailRef.current.focus();
              }
            }, [errors.email, touched.email]);
            return (
              <Form className="bg-white xl:w-1/5 lg:w-2/5 md:w-3/5 mx-auto p-7 shadow-2xl">
                <h2 className="uppercase text-2xl font-medium text-center mt-10">
                  {" "}
                  Đăng nhập
                </h2>
                <p className="text-sm mt-2 mb-5">
                  Nếu bạn chưa có tài khoản,{" "}
                  <Link to="/register" className="underline">
                    hãy đăng ký tại đây
                  </Link>
                </p>
                <div className="w-full mb-3">
                  <Field
                    className={`bg-green-50 px-2 py-3 w-full outline-none rounded ${
                      errors.email && touched.email
                        ? "border border-red-600"
                        : ""
                    }`}
                    type="text"
                    name="email"
                    placeholder="Email"
                    innerRef={inputEmailRef}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-sm text-red-700">{errors.email}</div>
                  ) : null}
                </div>
                <div className="w-full mb-3">
                  <Field
                    className={`bg-green-50 px-2 py-3 w-full outline-none rounded ${
                      errors.email && touched.email
                        ? "border border-red-600"
                        : ""
                    }`}
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-sm text-red-700">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="w-full mb-3">
                  <Field
                    type="checkbox"
                    name="isRememberMe"
                    id="isRememberMe"
                  />
                  <label htmlFor="isRememberMe" className="ml-2 select-none">
                    Ghi nhớ đăng nhập?
                  </label>
                </div>
                <button
                  type="submit"
                  className="mb-4 bg-black text-white w-full py-2 font-semibold duration-100 border hover:bg-white hover:border-black hover:text-black rounded"
                  onClick={() => {
                    if (errors) {
                      inputEmailRef.current.focus();
                    }
                  }}
                >
                  {" "}
                  Đăng nhập
                </button>
                <div className="text-sm text-center block p-4 ">
                  Quên mật khẩu?{" "}
                  <span
                    className="cursor-pointer underline hover:text-primary duration-200"
                    onClick={() => handleFindPassword()}
                  >
                    Tìm lại tại đây
                  </span>
                </div>
                <p className="text-sm text-center">Hoặc đăng nhập bằng</p>
                <div className="flex items-center justify-center mt-4 w-full sm:w-60  mx-auto">
                  <a href="" className="block w-2/5 mr-2">
                    <img src={fb} alt="" />
                  </a>
                  <a href="" className="block w-2/5">
                    <img src={gg} alt="" />
                  </a>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
