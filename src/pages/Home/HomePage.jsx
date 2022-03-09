import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";
import HomeBody from "./HomePageBody";
import HomeCarousel from "./HomePageCarousel";
import HomePageSearch from "./HomePageSearch";
import { CLICK_SEARCH_SCROLL } from "../../redux/Types/ClientSearchType";

let scrollY = window.scrollY;

const HomePage = (props) => {
  const [scroll, setScroll] = useState(false);
  const changeHeader = () => {
    if (scrollY != window.scrollY) {
      scrollY = window.scrollY;
      dispatch({
        type: CLICK_SEARCH_SCROLL,
        data: false,
      });
    }
    if (window.scrollY > 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  window.addEventListener("scroll", changeHeader);
  const { clickSearchScroll } = useSelector(
    (state) => state.ClientSearchReducer
  );
  const dispatch = useDispatch();
  const notClickSearch = () => {
    return (
      <div style={{ position: "fixed", width: "100%", zIndex: 1, top: "0" }}>
        {scroll ? (
          <div>
            <Header bkColor="white" color="black" />
            <HomePageSearch
              props={props}
              menu={false}
              color="white"
              id="home_search_scroll"
            />
          </div>
        ) : (
          <div>
            <Header bkColor="black" color="white" />
            <HomePageSearch
              props={props}
              menu={true}
              color="white"
              id="home_search"
            />
          </div>
        )}
      </div>
    );
  };

  const clickSearch = () => {
    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1,
          top: "0",
          height: "195px",
          backgroundColor: "white",
        }}
      >
        <Header bkColor="white" color="black" />
        <HomePageSearch
          props={props}
          menu={true}
          color="black"
          id="home_search"
        />
      </div>
    );
  };
  return (
    <div style={{ marginTop: "75px" }}>
      {clickSearchScroll ? clickSearch() : notClickSearch()}
      <HomeCarousel />
      <HomeBody />
      <Footer />
    </div>
  );
};

export default HomePage;
