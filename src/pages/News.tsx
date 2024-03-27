import SubHeader from "../components/subHeader/SubHeader";
import developing from "/developing.png";
import { Link } from "react-router-dom";
const News = () => {
  return (
    <>
      <SubHeader heading="Đang phát triển" />
      <div className="py-20 mx-auto w-3/5 text-center">
        <h2 className="text-3xl text-primary font-bold">
          Trang này đang được phát triển
        </h2>
        <p className="text-primary my-5 font-bold italic underline">
          Xin lỗi vì sự bất tiện này. Chúng tôi đang nỗ lực để mang lại trải
          nghiệm tốt nhất cho bạn.
        </p>
        <Link
          className="bg-primary text-white px-2 py-1 rounded hover:text-primary hover:bg-white border border-primary
         duration-200"
          to={"/"}
        >
          Nhấn vào đây để quay về trang chủ{" "}
        </Link>
        <div className="flex justify-center mt-8">
          <img
            src={developing}
            alt="Under Construction"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
};

export default News;
