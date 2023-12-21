import React from "react";
import "../../components/menuToday/style.css";
import { Link } from "react-router-dom";

interface THeadingProps {
  title: string;
  className?: string;
  href: string;
}

const Heading: React.FC<THeadingProps> = ({ title, className, href }) => {
  return (
    <div>
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
