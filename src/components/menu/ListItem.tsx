import React, { useState } from "react";
import "./listItem.css";
import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";
import "animate.css";

interface TListItemProps {
  title: string;
  list?: string[];
  href?: string;
}
const ListItem: React.FC<TListItemProps> = ({ title, list, href }) => {
  const [items, setItems] = useState<string[]>([]);

  const handleShowMenu = () => {
    if (items.length == 0) {
      list ? setItems(list) : "";
    } else {
      setItems([]);
    }
  };
  return (
    <li className="mb-2">
      <a
        href={href}
        className={`flex justify-between items-center title ${
          items.length > 0 ? "primary" : ""
        }`}
        onClick={handleShowMenu}
      >
        {title}
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
      </a>
      {items ? (
        <ul className="ml-6">
          {items.map((item, i) => (
            <li key={i}>
              <a href="#">{item}</a>
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
