import { useState } from "react";
import SubHeader from "../components/subHeader/SubHeader";
import { Email, LocationOn, Phone } from "@mui/icons-material";
import Heading from "../components/common/Heading";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    content: "",
  });

  const handleSubmit = async () => {
    try {
      const formDataSaved = await axios.post(
        "http://localhost:5500/contacts",
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cảm ơn bạn đã gửi thông tin góp ý về cho chúng tôi!",
      });
      setFormData({
        username: "",
        phone: "",
        email: "",
        content: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: "Vui lòng kiểm tra lại các thông tin của bạn",
      });
    }
  };
  return (
    <div className="bg-primary-100">
      <SubHeader heading="liên hệ" />
      <div className="xl:mx-auto xl:w-3/5  bg-white p-6 pt-8 mt-10 mx-6 rounded-xl border">
        <div className="grid xl:grid-cols-4 grid-cols-1 gap-4 mb-40">
          <div className="">
            <h6 className=" mb-6 text-primary font-bold text-2xl uppercase">
              Liên hệ
            </h6>
            <div>
              <Phone
                fontSize="small"
                color="action"
                sx={{ marginRight: "6px" }}
              />
              Hotline đặt hàng:{" "}
              <a href="tel:19006750" className="font-bold">
                19006750
              </a>
            </div>
            <div>
              <Email
                fontSize="small"
                color="action"
                sx={{ marginRight: "6px" }}
              />
              Email:{" "}
              <a href="mailto:support@monster.vn" className="font-bold">
                support@monster.vn
              </a>
            </div>
          </div>
          <div className="">
            {" "}
            <h6 className=" mb-6 text-primary font-bold text-2xl uppercase">
              Thời gian
            </h6>
            <div>
              Thứ 2 - Thứ 6:{" "}
              <a href="tel:19006750" className="font-bold">
                7am - 10pm
              </a>
            </div>
            <div>
              Thứ 7 - Chủ nhật:{" "}
              <a href="tel:19006750" className="font-bold">
                8am - 9pm
              </a>
            </div>
          </div>
          <div className="xl:col-span-2">
            <h6 className=" mb-6 text-primary font-bold text-2xl uppercase">
              địa chỉ
            </h6>
            <div className="flex items-center">
              <LocationOn
                fontSize="small"
                color="action"
                sx={{ marginRight: "6px" }}
              />
              <p className="">
                CN1: Tầng 6 toà Ladeco, 266 Đội Cấn, phường Liễu Giai, Hà Nội.
              </p>
            </div>
            <div className="flex  items-center">
              <LocationOn
                fontSize="small"
                color="action"
                sx={{ marginRight: "6px" }}
              />
              <p className="">
                CN2: Toà nhà Lữ Gia, 70 Lữ Gia, phường 15, quận 11, TP. HCM.
              </p>
            </div>
          </div>
        </div>
        <Heading
          title="Liên hệ với chúng tôi"
          href="/lien-he"
          className="font-bold mb-20 text-xl xl:text-3xl"
        />
        <form className="form-contact" onSubmit={(e) => e.preventDefault()}>
          <div className="">
            <input
              value={formData.username}
              type="text"
              placeholder="Họ và tên"
              className="text-xs"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <input
              value={formData.phone}
              type="text"
              placeholder="Số điện thoại"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              value={formData.email}
              type="text"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <textarea
              value={formData.content}
              className="mb-10"
              placeholder="Nội dung"
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center mb-20">
            <button
              type="submit"
              className="px-4 py-1 bg-white text-primary hover:text-white hover:bg-primary border-primary border uppercase font-bold text-2xl rounded-xl"
              onClick={handleSubmit}
            >
              Gửi thông tin
            </button>
          </div>
        </form>
      </div>
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14893.462760280177!2d105.81352216179356!3d21.058051714344916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aafe7260066b%3A0x4c2c988309aaa3db!2zSOG7kyBUw6J5!5e0!3m2!1svi!2s!4v1703047944992!5m2!1svi!2s"
          width={screen.width}
          height="500"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
