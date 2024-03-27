import React from "react";
import "../../components/menuToday/style.css";
import { Link } from "react-router-dom";

interface THeadingProps {
  title: string;
  className?: string;
  href: string;
  id?: string;
}

const Heading: React.FC<THeadingProps> = ({ title, className, href, id }) => {
  return (
    <div id={id}>
      <Link
        to={href}
        className={`${className} menu-today-title relative text-center block text-3xl uppercase`}
      >
        {title}
      </Link>
    </div>
  );
};

export default Heading;
