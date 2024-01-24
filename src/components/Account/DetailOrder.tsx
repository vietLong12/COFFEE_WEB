import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderService } from "../../service/OrderService";
import { ProductService } from "../../service/ProductService";

const DetailOrder = () => {
  const { slug } = useParams();
  const [order, setOrder] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await OrderService.getListOrder({ keyword: slug });
      const result = data.orders[0].items.map(async (item) => {
        const product = await ProductService.getProductById(item.productId);
        const size = product?.product.sizes?.filter(
          (s) => s._id === item.sizeId
        );
        return { ...item, ...product.product, ...size };
      });

      const dataWait = await Promise.all(result);
      setOrder({ ...data.orders[0], items: dataWait });
    };
    fetchData();
  }, [slug]);
  return (
    <div>
      <div className="">
        <div className="w-full mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-2xl uppercase">
            Thông tin đơn hàng:
            <span className="text-lg font-bold ml-3">
              #{order?.orderNumber} -{" "}
              <span className="text-red-600">{order?.status}</span>
            </span>
          </h2>
          <div className="grid grid-cols-2 mt-4 gap-4">
            {/* Thông tin khách hàng */}
            <div className="mb-4 border border-primary rounded p-2">
              <h3 className="text-xl font-semibold mb-2">
                Thông tin khách hàng:
              </h3>
              <p className="mb-1">
                <span className="font-bold">Tên khách hàng:</span>{" "}
                {order?.customer.username}
              </p>
              <p className="mb-1">
                <span className="font-bold">Địa chỉ:</span>{" "}
                {order?.customer.address}
              </p>
              <p className="mb-1">
                <span className="font-bold">Email:</span>{" "}
                {order?.customer.email}
              </p>
              <p className="mb-1">
                <span className="font-bold">Điện thoại:</span>{" "}
                {order?.customer.phone}
              </p>
            </div>

            {/* Ghi chú đơn hàng */}
            <div className="mb-4 border border-primary rounded p-2">
              <h3 className="text-xl font-semibold mb-2">
                Trạng thái đơn hàng:
              </h3>
              <p className="mb-1">
                <span className="font-bold">Tổng số tiền: </span>
                {order?.totalAmount}.000 đ
              </p>
              <p className="mb-1">
                <span className="font-bold">Trạng thái:</span> {order?.status}
              </p>
              <p className="mb-1">
                <span className="font-bold">Phương thức thanh toán:</span>{" "}
                {order?.paymentMethod}
              </p>
              <p className="mb-1">
                <span className="font-bold">Ghi chú:</span> {order?.note}
              </p>
            </div>

            {/* Chi tiết sản phẩm */}
            <div className="mb-4 border border-primary rounded p-2 col-span-2">
              <h3 className="text-xl font-semibold mb-2">Chi tiết sản phẩm:</h3>
              <ul className="h-96 overflow-y-auto">
                {order?.items.map((item, index) => (
                  <li
                    key={item._id}
                    className="mb-2 grid grid-cols-3 border-b pb-2"
                  >
                    <div className="col-span-2">
                      <p>
                        <span className="font-bold">
                          {index + 1}.Mã sản phẩm:
                        </span>{" "}
                        {item.productName}
                      </p>
                      <p>
                        <span className="font-bold up">Mã size:</span>
                        <span className="uppercase"> {item[0].name}</span>
                      </p>
                      <p>
                        <span className="font-bold">Số lượng:</span>{" "}
                        {item.quantity}
                      </p>
                      <p>
                        <span className="font-bold">Giá:</span> {item.price}.000
                        đ
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <img src={item.img} className="w-20 h-20" alt="" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Số đơn hàng và thời gian */}
            <div className="mb-4 border border-primary rounded p-2 col-span-2">
              <h3 className="text-xl font-semibold mb-2">Thông tin bổ sung:</h3>

              <p>
                <span className="font-bold">Mã đơn hàng:</span> {order?._id}
              </p>
              <p>
                <span className="font-bold">Ngày tạo đơn:</span>{" "}
                {new Date(order?.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-bold">
                  Ngày cập nhật trạng thái gần nhất:
                </span>{" "}
                {new Date(order?.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
