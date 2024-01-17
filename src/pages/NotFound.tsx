import { Link } from "react-router-dom";
import SubHeader from "../components/subHeader/SubHeader";

const NotFound = () => {
  return (
    <>
      <SubHeader heading="404 Không tìm thấy trang" />
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="my-4">Trang này đang bị lỗi bạn vui lòng quay trở lại trang chủ</p>
        <Link to={"/"} className="bg-primary py-4 block w-fit mx-auto text-white px-3">
          Quay lại trang chủ
        </Link>
      </div>
    </>
  );
};

export default NotFound;
