import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { managerRoomsService } from "../../services/ManagerRoomsService";
import HomePageSearch from "../Home/HomePageSearch";
import "./ListRoom.css";
import { useSelector, useDispatch } from "react-redux";
import formatNumber from "./../../utils/formatNumber";
import { Pagination } from "antd";
import { CLICK_SEARCH_SCROLL } from "./../../redux/Types/ClientSearchType";
import HomePageSearchMobile from "../Home/HomePageSearchMobile";

let scrollY = window.scrollY;

export const ListRoomMobile = (props) => {
  const [listRoom, setListRoom] = useState([]);

  let { searchRoom } = useSelector(
    (rootReducer) => rootReducer.ClientSearchReducer
  );

  let { place, checkinString, checkoutString, guestsTotal } = searchRoom;
  let roomFilter = listRoom.filter((list, index) => {
    if (list.guests >= guestsTotal) {
      if (place.split(",").length > 1) {
        return list.locationId
          ? list.locationId.province == place.split(",")[1].trim()
          : false;
      } else return true;
    }
    return false;
  });
  let numEachPage = 5;
  let [valuePagination, setValuePagination] = useState({
    minValue: 0,
    maxValue: numEachPage - 1,
  });

  const [scroll, setScroll] = useState(false);
  const { clickSearchScroll } = useSelector(
    (state) => state.ClientSearchReducer
  );
  const dispatch = useDispatch();

  const getListRoom = () => {
    let promise = managerRoomsService.getAllRoom();
    promise.then((result) => {
      let arr = result.data;
      setListRoom(arr);
    });
    promise.catch((err) => {
      console.log("Error in getListRoom:", err);
    });
  };

  const handleChange = (page, pageSize) => {
    if (page == 0) {
      page++;
    }
    setValuePagination({
      minValue: (page - 1) * pageSize,
      maxValue: page * pageSize - 1,
    });
  };

  useEffect(() => {
    getListRoom();
  }, []);

  const getValueRoom = (room) => {
    let detail = "";
    let { elevator, pool, dryer, gym, kitchen, wifi, heating, cableTV } = room;
    if (elevator) detail += " - Thang máy";
    if (pool) detail += " - Hồ bơi";
    if (dryer) detail += " - Máy sấy tóc";
    if (gym) detail += " - Phòng tập gym";
    if (kitchen) detail += " - Nhà bếp";
    if (wifi) detail += " - Wifi";
    if (heating) detail += " - Lò sưởi";
    if (cableTV) detail += " - Cáp TV";
    return detail;
  };

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

  const notClickSearch = () => {
    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1,
          top: "0px",
          backgroundColor: "white",
          height: "83px",
        }}
      >
        {scroll ? (
          <div>
            <HomePageSearch
              props={props}
              menu={false}
              color="white"
              id="home_search_scroll"
              marginTop="10px"
            />
          </div>
        ) : (
          <div style={{ paddingTop: "20px" }}>
            <Header bkColor="white" color="black" />
            <HomePageSearchMobile
              props={props}
              menu={false}
              color="white"
              id="list_room_search"
              marginTop="10px"
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
          height: "160px",
          backgroundColor: "white",
        }}
      >
        <Header bkColor="white" color="black" />
        <HomePageSearchMobile
          props={props}
          menu={false}
          color="black"
          id="home_search"
          marginTop="-30px"
        />
      </div>
    );
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {clickSearchScroll ? clickSearch() : notClickSearch()}
      <div className="pl-5 mt-5">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-12">
            <span>
              Hơn {roomFilter.length} chỗ - {checkinString} - {checkoutString}
            </span>
            <h3>Chỗ ở tại khu vực bản đồ đã chọn</h3>
            <div className="row">
              <button className="btn btn-light filter_button col-3">
                Loại nơi ở
              </button>
              <button className="btn btn-light filter_button col-3">Giá</button>
              <button className="btn btn-light filter_button col-3">
                Đặt ngay
              </button>
              <button className="btn btn-light filter_button col-5">
                Phòng và phòng ngủ
              </button>
              <button className="btn btn-light filter_button col-5">
                Bộ lọc khác
              </button>
            </div>
            {roomFilter.map((list, index) => {
              if (
                index >= valuePagination.minValue &&
                index <= valuePagination.maxValue
              )
                return (
                  <div
                    onClick={() =>
                      props.history.push("/room-detail/" + list._id)
                    }
                    className="row pt-3 mt-3"
                    style={{
                      borderTop: "1px solid black",
                      cursor: "pointer",
                    }}
                    key={index}
                  >
                    <div className="col-6">
                      <img
                        src={
                          list.image
                            ? list.image
                            : "https://picsum.photos/id/1008/300/300"
                        }
                        alt=""
                      />
                    </div>
                    <div className="col-6">
                      <h6>{list.name}</h6>
                      <p>
                        {list.guestsTotal} Khách -{list.bedRoom} phòng ngủ -
                        {list.bath}
                        phòng tắm{getValueRoom(list)}
                      </p>
                      <div className="text-right">
                        <span className="font-weight-bold">
                          {formatNumber(list.price)}
                        </span>
                        /đêm
                      </div>
                    </div>
                  </div>
                );
            })}
            <Pagination
              className="mt-3 mb-3"
              defaultCurrent={0}
              defaultPageSize={numEachPage}
              onChange={handleChange}
              total={roomFilter.length}
            />
          </div>
          <div className="col-12">
            <div
              style={{
                position: "sticky",
                top: "5px",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.553673986311!2d106.68808435!3d10.8007089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1643026906385!5m2!1svi!2s"
                width={"100%"}
                style={{ border: 0, height: "50vh" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
