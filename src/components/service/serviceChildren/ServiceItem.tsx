import React from "react";

interface TServiceItemProps {
  img: string;
  title: string;
  desc: string;
}
const ServiceItem: React.FC<TServiceItemProps> = ({ img, title, desc }) => {
  return (
    <div className="flex flex-col items-center text-white service-parent">
      <div className="rounded-full bg-white w-52 h-52 flex justify-center items-center mb-6 service-hover relative">
        <img src={img} width={160} className="" alt="" />
      </div>
      <h3 className="font-bold text-3xl text-center mb-2 cursor-pointer">{title}</h3>
      <p className="text-justify leading-4">{desc}</p>
    </div>
  );
};

export default ServiceItem;
