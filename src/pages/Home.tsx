import AboutUs from "../components/aboutUs/AboutUs";
// @ts-ignore
import BackToTop from "../components/common/BackToTop";
// @ts-ignore
import Footer from "../components/footer/Footer";
// @ts-ignore
import Header from "../components/header/Header";
import ImageCoffee from "../components/imgCoffee/ImageCoffee";
// @ts-ignore
import NavBar from "../components/menu/NavBar";
import MenuToday from "../components/menuToday/MenuToday";
import News from "../components/news/News";
import OpeningTime from "../components/openingTime/OpeningTime";
import RateComponent from "../components/rateComponent/RateComponent";
import Service from "../components/service/Service";
import Slider from "../components/slider/Slider";
import monsterCoffee from "../assets/icon/logo-sidebar.webp";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-home">
      <Link
        to={"/"}
        className="uppercase font-bold text-5xl text-center underline  text-primary pt-12 block"
      >
        <img
          src={monsterCoffee}
          alt=""
          className="text-primary mx-auto  px-6 py-4 rounded-lg border border-primary hover:border-white hover:bg-primary duration-200"
          width={350}
        />
      </Link>
      <div className="xl:w-3/5 xl:mx-auto xl:p-0 ps-4 pe-4 w-full mx-auto ">
        <Slider />
        <AboutUs />
        <Service />
      </div>
      <MenuToday />
      <RateComponent />
      <OpeningTime />
      <div className="xl:w-3/5 mx-auto overflow-hidden">
        <ImageCoffee />
      </div>
      <News />
    </div>
  );
};

export default Home;
