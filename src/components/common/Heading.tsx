import React from "react";
import "../../components/menuToday/style.css"

interface THeadingProps {
  title: string;
}

const Heading: React.FC<THeadingProps> = ({title}) => {
  return (
    <div>
      <a
        href="#"
        className="menu-today-title relative text-center block text-3xl uppercase"
      >
        {title}
      </a>
    </div>
  );
};

export default Heading;
