import React, { useState } from "react";
import "./listItem.css";
import { ArrowDropDown, ArrowLeft, Circle } from "@mui/icons-material";
import "animate.css";
import { Link } from "react-router-dom";
import { slugify } from "../../utilities";

interface TListItemProps {
  title: string;
  list?: string[];
  href: string;
}
const ListItem: React.FC<TListItemProps> = ({ title, list, href }) => {
  const [items, setItems] = useState<string[]>([]);

  const handleShowMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (list) {
      e.stopPropagation();
    }
    if (items.length == 0) {
      list ? setItems(list) : "";
    } else {
      setItems([]);
    }
  };
  return (
    <li className="mb-2">
      <Link
        to={href}
        className={`flex justify-start items-center title ${
          items.length > 0 ? "primary" : ""
        }`}
        onClick={(e) => handleShowMenu(e)}
      >
        {title}
        {href === "live" ? (
          <Circle fontSize="small" sx={{fontSize: "10px",position: "relative",top: "-5px"}} color="warning" />
        ) : (
          ""
        )}
        {list ? (
          items && items.length !== 0 ? (
            <div>
              <ArrowDropDown />
            </div>
          ) : (
            <div>
              <ArrowLeft />
            </div>
          )
        ) : (
          ""
        )}
      </Link>
      {items ? (
        <ul className="ml-6">
          {items.map((item, i) => (
            <li key={i}>
              <Link to={"/menu/" + slugify(item)}>{item}</Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default ListItem;
