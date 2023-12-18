import { KeyboardArrowUpOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-10 right-10 border-black border-2 bg-red-600 rounded-full bg-primary text-white ${
        show ? "" : "hidden"
      }`}
      onClick={handleBackToTop}
    >
      <KeyboardArrowUpOutlined fontSize="large" />
    </button>
  );
};

export default BackToTop;
