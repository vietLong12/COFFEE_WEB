import { dataMenuList } from "../../../data/data";
import MenuItem from "./MenuItem";

const MenuList = () => {

  return (
    <div>
      <div className="xl:w-3/5 w-full mt-20 mx-auto  flex flex-col lg:flex-row  lg:flex-wrap justify-between px-6">
        {dataMenuList.map((item, index) => (
          <MenuItem key={index} data={item}/>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
