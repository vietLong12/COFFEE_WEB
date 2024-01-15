import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { AccountService } from "../../service/AccountService";
import { OrderService } from "../../service/OrderService";

const MyOrder = () => {
  const auth = useContext(AuthContext);
  const user = auth?.userData;
  // @ts-ignore
  const [userData, setUserData] = useState();
  const [orders, setOrders] = useState<any>();
  console.log("orders: ", orders);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const account = await AccountService.getAccountById(user?._id);
        setUserData(account.data);

        const orders = await OrderService.getListOrder({
          keyword: account.data.email,
        });
        setOrders(orders.orders);
      }
    };
    fetchData();
  }, []);
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
            {orders?.map((row: any) => (
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
                  {"#" + row.orderNumber}
                </TableCell>
                <TableCell align="center">
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{row.customer.address}</TableCell>
                <TableCell align="center">{row.totalAmount}.000đ</TableCell>
                <TableCell align="center" sx={{}}>
                  <span
                    className={` block ${
                      !row.status ? "text-blue-600" : "text-red-500"
                    }`}
                  >
                    {row.status ? "Chưa thanh toán" : "Đã thanh toán"}
                  </span>
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrder;
