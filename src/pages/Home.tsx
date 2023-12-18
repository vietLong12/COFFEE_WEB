import AboutUs from "../components/aboutUs/AboutUs";
import BackToTop from "../components/common/BackToTop";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ImageCoffee from "../components/imgCoffee/ImageCoffee";
import NavBar from "../components/menu/NavBar";
import MenuToday from "../components/menuToday/MenuToday";
import News from "../components/news/News";
import OpeningTime from "../components/openingTime/OpeningTime";
import RateComponent from "../components/rateComponent/RateComponent";
import Service from "../components/service/Service";
import Slider from "../components/slider/Slider";


const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-3/5 mx-auto">
        <NavBar />
        <Slider />
        <AboutUs />
        <Service />
      </div>
      <MenuToday />
      <RateComponent />
      <OpeningTime />
      <div className="w-3/5 mx-auto">
        <ImageCoffee />
      </div>
      <News />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;
