// @ts-nocheck
import Header from "../components/header/Header";
import Heading from "../components/common/Heading";
import SubHeader from "../components/subHeader/SubHeader";

const Introduction = () => {
  return (
    <div className="mb-10">
      <SubHeader heading="Giới thiệu" />
      <div className="lg:w-3/5 w-full lg:px-0 px-4 mx-auto my-2 mt-4">
        <h3 className="font-semibold text-4xl text-center">Lời mở đầu</h3>
        <p className="mt-2">
          Cửa hàng cà phê Monster là điểm đến lý tưởng cho những người yêu
          thưởng thức hương vị cà phê độc đáo và không gian thoải mái.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="https://i.pinimg.com/564x/b4/d2/4e/b4d24ec5871681f6ae8b0029c5a09c71.jpg"
            alt=""
            width={350}
          />
        </div>
        <p>
          Với tâm huyết và đam mê, chúng tôi đã tạo ra một không gian ấm cúng,
          nơi mọi người có thể tận hưởng không chỉ những tách cà phê ngon lành
          mà còn là trải nghiệm đầy sáng tạo và thú vị. Monster không chỉ là một
          cửa hàng cà phê thông thường, mà là một nơi thăng hoa của sự sáng tạo.
          Đội ngũ barista tại đây không chỉ là những người nắm vững nghệ thuật
          pha chế cà phê mà còn là những nghệ sĩ tài năng, luôn tìm kiếm cách để
          làm mới và nâng cao trải nghiệm của khách hàng.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="https://i.pinimg.com/564x/9c/0d/1c/9c0d1ca75ae3c7b47f3433943a79afa6.jpg"
            alt=""
            width={200}
          />
        </div>
        <p>
          Chúng tôi tự hào về việc cung cấp một loạt các loại cà phê chất lượng
          cao từ những hạt cà phê tinh tế, kết hợp cùng các phương pháp pha chế
          độc đáo. Không gian của Monster được thiết kế với sự chú ý đặc biệt
          đến sự thoải mái và hiện đại. Với ánh sáng dịu dàng, nội thất sang
          trọng và không gian mở rộng, cửa hàng là nơi lý tưởng để tận hưởng cà
          phê cùng bạn bè, họp nhóm hoặc đơn giản chỉ là để tận hưởng khoảnh
          khắc riêng tư của bạn.
        </p>
        <p>
          Monster còn nổi tiếng với menu đa dạng, từ cà phê truyền thống cho đến
          những đồ uống sáng tạo và độc đáo. Bạn có thể lựa chọn từ các loại cà
          phê đơn giản như Espresso hay Americano, đến những sáng tạo như
          Caramel Macchiato hoặc Matcha Latte. Ngoài ra, chúng tôi còn cung cấp
          các loại thức uống lạ mắt như Cold Brew pha lê hay các loại sinh tố cà
          phê sảng khoái. Với tầm nhìn "Tạo ra trải nghiệm cà phê độc đáo,"
          Monster cam kết mang đến cho khách hàng không chỉ là cốc cà phê ngon
          miệng mà còn là một hành trình khám phá vị giác và trải nghiệm mới lạ.
          Hãy đến và cảm nhận sức mạnh của hương vị tại Monster - nơi cà phê trở
          thành một nghệ thuật!
        </p>
      </div>
    </div>
  );
};

export default Introduction;
