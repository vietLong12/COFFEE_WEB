import HeaderLeft from "./children/HeaderLeft";

const Header = () => {
  return (
    <>
      <div className="border-b border-yellow-200 bg-black px-4 lg:px-0 xl:static sticky top-0 z-50">
        <HeaderLeft />
      </div>
    </>
  );
};

export default Header;
