import { dataMenuList } from "../../../data/data";
import MenuItem from "./MenuItem";

const MenuList = () => {

  return (
    <div>
      <div className="w-3/5 mt-20 mx-auto flex flex-wrap justify-between px-4">
        {dataMenuList.map((item, index) => (
          <MenuItem key={index} data={item}/>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
