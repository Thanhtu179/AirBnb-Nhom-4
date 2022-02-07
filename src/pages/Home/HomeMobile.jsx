import React from "react";
import Footer from "../../components/Footer/Footer";
import Header, { HeaderFix } from "../../components/Header/Header";
import "./Home.css";
import HomeBody from "./HomePageBody";
import HomeCarousel from "./HomePageCarousel";
import HomePageSearch from "./HomePageSearch";

const HomeMobile = (props) => {
  return (
    <div>
      <Header menu={true} bkColor="black" color="white" />
      <HomePageSearch props={props} id="home_search" />
      <HomeCarousel />
      <HomeBody />
      <Footer />
    </div>
  );
};

export default HomeMobile;
