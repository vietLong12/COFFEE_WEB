import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ArrowRightTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import fb from "../assets/icon/fb-btn.svg";
import gg from "../assets/icon/gp-btn.svg";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../redux/action/account";

interface Values {
  email: string;
  password: string;
}

const initValue = {
  email: "",
  password: "",
};

const Login = () => {

  const dispatch = useDispatch();

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
    setTimeout(() => {
      dispatch(login(values))
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="bg-black">
      <Header />
      <div className="mt-20 text-center text-white uppercase text-4xl primary font-bold">
        <h3>đăng nhập tài khoản</h3>
        <div>
          <span className="text-base text-white normal-case">
            <Link to="/" className="hover:opacity-60">
              Trang chủ
            </Link>{" "}
            <ArrowRightTwoTone /> Đăng nhập tài khoản
          </span>
        </div>
      </div>
      <div className="bg-white mt-20 py-10">
        <Formik
          initialValues={initValue}
          onSubmit={handleSubmitForm}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="bg-white  w-1/5 mx-auto p-7 shadow-2xl">
                <h2 className="uppercase text-2xl font-medium text-center">
                  {" "}
                  Đăng nhập
                </h2>
                <p className="text-sm mt-2 mb-5">
                  Nếu bạn chưa có tài khoản,{" "}
                  <Link to="/register" className="underline">hãy đăng ký tại đây</Link>
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

      <Footer />
    </div>
  );
};

export default Login;
