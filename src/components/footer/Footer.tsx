import "./footer.css";
import FooterHeading from "./footerHeading/FooterHeading";
import FooterInfo from "./footerInfo/FooterInfo";

const Footer = () => {
  return (
    <div className="bg-black w-full h-auto">
      <FooterHeading />
      <FooterInfo />
      <div className="text-white w-full text-center py-5">
        Copyright © 2023 | LongNV
      </div>
    </div>
  );
};

export default Footer;
