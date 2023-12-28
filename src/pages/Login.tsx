import fb from "../assets/icon/fb-btn.svg";
import gg from "../assets/icon/gp-btn.svg";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../redux/action/account";
import SubHeader from "../components/subHeader/SubHeader";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";
import { account } from "../data/data";

interface Values {
  email: string;
  password: string;
}

const initValue = {
  email: "",
  password: "",
};

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Mật khẩu tối thiểu phải là 6 kí tự")
      .max(12, "Mật khẩu phải nhỏ hơn 12 kí tự")
      .required("Đây là bắt buộc"),
    email: Yup.string().email("Email không hợp lệ").required("Đây là bắt buộc"),
  });

  const handleSubmitForm = (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const user = account.filter((user) => user.email === values.email);
    if (user.length > 0) {
      auth?.setLoggedIn(true);
      auth?.setCart(user[0].cart.items);
      auth?.setUserData({
        address: user[0].address,
        email: user[0].email,
        phone: user[0].phone,
        username: user[0].username,
      });
      navigate("/");
      setSubmitting(false);
    } else {
      Swal.fire({ title: "Đăng nhập thất bại", icon: "error" });
    }
  };

  return (
    <div className="bg-black">
      <SubHeader heading={"Đăng nhập"} />
      <div className="bg-white mt-20 py-10">
        <Formik
          initialValues={initValue}
          onSubmit={handleSubmitForm}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="bg-white xl:w-1/5 lg:w-2/5 mx-auto p-7 shadow-2xl">
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
                    className="bg-green-50 px-2 py-3 w-full outline-none"
                    type="text"
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
                <button
                  type="submit"
                  className="mb-4 bg-black text-white w-full py-2 font-semibold duration-100 border hover:bg-white hover:border-black hover:text-black"
                >
                  {" "}
                  Đăng nhập
                </button>
                <a href="" className="text-sm text-center block p-4">
                  Quên mật khẩu
                </a>
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
