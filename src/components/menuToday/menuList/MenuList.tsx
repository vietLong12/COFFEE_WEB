import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { GetProductListResponse, ProductResponse } from "../../../Types/ResponseType";
import { ProductService } from "../../../service/ProductService";

const MenuList = () => {
  const [listMenu, setListMenu] = useState<ProductResponse[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const listMenu: GetProductListResponse = await ProductService.getListProduct({ page: "4",limit: "8" });
      setListMenu(listMenu.products);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="xl:w-3/5 w-full mt-20 mx-auto  flex flex-col lg:flex-row  lg:flex-wrap justify-between px-6">
        {listMenu?.map((item, index) => (
          <MenuItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
