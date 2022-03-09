import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";
import HomeBody from "./HomePageBody";
import HomeCarousel from "./HomePageCarousel";
import HomePageSearchMobile from "./HomePageSearchMobile";
import { CLICK_SEARCH_SCROLL } from "../../redux/Types/ClientSearchType";

let scrollY = window.scrollY;

const HomeMobile = (props) => {
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
            <Header bkColor="white" color="black" mobile={true} />
            <HomePageSearchMobile
              props={props}
              menu={false}
              color="white"
              id="home_search_scroll"
              marginTop="50px"
            />
          </div>
        ) : (
          <div>
            <Header bkColor="black" color="white" mobile={true} />
            <HomePageSearchMobile
              props={props}
              menu={false}
              color="white"
              id="home_search"
              marginTop="-20px"
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
          height: "165px",
          backgroundColor: "white",
        }}
      >
        <Header bkColor="white" color="black" mobile={true} />
        <HomePageSearchMobile
          props={props}
          color="black"
          id="home_search"
          marginTop="-28px"
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

export default HomeMobile;
