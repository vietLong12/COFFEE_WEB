import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { AccountService } from "../../service/AccountService";
import { Modal, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { ImageUploadService } from "../../service/ImageUploadService";

const AccountInfo = () => {
  const auth = useContext(AuthContext);
  const user = auth?.userData;
  const [userData, setUserData] = useState<any>();
  const [avatarLink, setAvatarLink] = useState<any>("");
  const [file, setFile] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    p: 4,
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const account = await AccountService.getAccountById(user?._id);
        setUserData(account.data);
      }
    };
    fetchData();
    setAvatarLink(user?.avatar);
  }, [auth?.render]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: auth?.userData?.username,
      email: auth?.userData?.email,
      phone: auth?.userData?.phone,
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("*Tên người dùng không được để trống"),
      email: Yup.string()
        .email("*Email không hợp lệ")
        .required("*Email không được để trống"),
      phone: Yup.string().required("*Số điện thoại không được để trống"),
      password: Yup.string().required("*Mật khẩu không được để trống"),
    }),
    onSubmit: async (values) => {
      if (file) {
        try {
          if (auth?.userData?._id) {
            console.log(file[0]);
            const formData = new FormData();
            formData.append("file", file[0]);
            const image = await ImageUploadService.postImage(formData);
            const req = {
              ...values,
              avatar: image.path,
              user_id: auth?.userData?._id,
            };
            const account = await AccountService.putAccount(req);
            if (account.code == 200) {
              Swal.fire({
                icon: "success",
                title: "Bạn đã thay đổi thông tin cá nhân thành công",
              });
              auth.setRender(!auth.render);
              handleClose();
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        if (auth?.userData?._id) {
          const req = {
            ...values,
            user_id: auth?.userData?._id,
          };
          const account = await AccountService.putAccount(req);
          if (account?.code == 200) {
            Swal.fire({
              icon: "success",
              title: "Bạn đã thay đổi thông tin cá nhân thành công",
            });
            auth.setRender(!auth.render);
            handleClose();
          }
        }
      }
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  const handleSetAvatar = (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      setFile(e.target.files);
      const a = e.target.files[0];
      a.preview = URL.createObjectURL(a);
      setAvatarLink(a.preview);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Ảnh không hợp lệ vui lòng kiểm tra lại",
      });
      handleClose();
    }
  };
  return (
    <div>
      <h2 className="text-2xl uppercase">thông tin tài khoản</h2>
      <div className="mt-4 grid grid-cols-3">
        <div className="col-span-2 font-bold">
          <div className="mb-2">
            Họ tên: <span className="font-normal">{userData?.username}</span>
          </div>
          <div className="mb-2">
            Email: <span className="font-normal">{userData?.email}</span>
          </div>
          <div className="mb-2">
            Điện thoại: <span className="font-normal">{userData?.phone}</span>
          </div>
          <button
            className="mt-3 border border-primary px-3 py-1 rounded-md hover:bg-white hover:text-primary duration-200 bg-primary text-white font-normal"
            onClick={handleOpen}
          >
            Chỉnh sửa thông tin
          </button>
        </div>
        <div className="flex justify-center flex-col items-center">
          <div className="mb-2 border">
            <img
              src={userData?.avatar}
              alt="Không có hình ảnh"
              className="h-36"
            />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg w-3/5">
          <h1 className="text-2xl uppercase text-center mb-8">
            Chỉnh sửa thông tin cá nhân
          </h1>
          <div className="grid grid-cols-2 gap-6">
            <div className="">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="username" className="block">
                    Tên người dùng:{" "}
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="block border w-full py-1 px-2"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>

                <div className="mb-2">
                  <label htmlFor="email" className="block">
                    Email:
                  </label>
                  <input
                    type="text"
                    disabled
                    id="email"
                    name="email"
                    className="border w-full py-1 px-2 block mb-3 opacity-70"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="mb-2">
                  <label htmlFor="phone" className="block">
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="block border w-full py-1 px-2"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>

                <div className="mb-2">
                  <label htmlFor="password" className="block">
                    Nhập mật khẩu:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="block border w-full py-1 px-2"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-block border px-2 py-1 bg-primary text-white border-primary rounded-md mt-3 hover:text-primary duration-200 hover:bg-white mr-2"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    type="button"
                    className="inline-block border px-2 py-1 bg-white text-primary border-primary rounded-md mt-3 hover:text-white duration-200 hover:bg-primary"
                    onClick={handleClose}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center flex-col items-center">
              <div className="mb-8 flex justify-center">
                <img
                  src={avatarLink}
                  alt="Không có hình ảnh"
                  className="h-36"
                />
              </div>
              <div>
                <input
                  type="file"
                  className=""
                  onChange={(e) => handleSetAvatar(e)}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AccountInfo;
