import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Address, OrderType } from "../../Types";

const MyOrder = () => {
  const auth = useContext(AuthContext);
  const orders: OrderType[] = [
    {
      _id: 1024,
      orderDate: new Date().toLocaleDateString(),
      address: auth?.userData?.address[0],
      email: auth?.userData?.email
        ? auth?.userData?.email
        : "example@example.com",
      priceTotal: 76,
      shippingStatus: false,
      status: false,
    },
    {
      _id: 1025,
      orderDate: new Date().toLocaleDateString(),
      address: auth?.userData?.address[0],
      email: auth?.userData?.email
        ? auth?.userData?.email
        : "example@example.com",
      priceTotal: 124,
      shippingStatus: true,
      status: true,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl uppercase mb-4">đơn hàng của bạn</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-primary ">
              <TableCell sx={{ minWidth: "100px", color: "white" }}>
                Đơn hàng
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Ngày
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white" }}
                className="w-60"
              >
                Địa chỉ
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Giá trị đơn hàng
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                TT Thanh toán
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                TT Vận chuyển
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row._id}
                className=""
                sx={{ "&:last-child td, &:last-child th": {} }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "blueviolet" }}
                >
                  {"#" + row._id}
                </TableCell>
                <TableCell align="center">{row.orderDate}</TableCell>
                <TableCell align="center">
                  {row.address?.homeAddress},{row.address?.ward?.name},
                  {row.address?.district?.name},{row.address?.city?.name},
                </TableCell>
                <TableCell align="center">{row.priceTotal}.000đ</TableCell>
                <TableCell align="center" sx={{}}>
                  <span
                    className={` block ${
                      !row.status ? "text-blue-600" : "text-red-500"
                    }`}
                  >
                    {row.status ? "Chưa thanh toán" : "Đã thanh toán"}
                  </span>
                </TableCell>
                <TableCell align="center">
                  {!row.shippingStatus ? "Đang vận chuyển" : "Chưa chuyển"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrder;
