import React from "react";
import Footer from "../../components/Footer/Footer";
import Header, { HeaderFix } from "../../components/Header/Header";
import "./Home.css";
import HomeBody from "./HomeBody";
import HomeCarousel from "./HomeCarousel";
import HomeSearch from "./HomeSearch";

const Home = () => {
  return (
    <div>
      <Header menu={true} />
      <HomeSearch />
      <HomeCarousel />
      <HomeBody />
      <Footer />
    </div>
  );
};

export default Home;
