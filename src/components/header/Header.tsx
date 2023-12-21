import NavBar from "../menu/NavBar";
import HeaderLeft from "./children/HeaderLeft";

const Header = () => {
  return (
    <>
      <div className="border-b border-yellow-200 bg-black px-4 lg:px-0">
        <HeaderLeft />
      </div>
    </>
  );
};

export default Header;
