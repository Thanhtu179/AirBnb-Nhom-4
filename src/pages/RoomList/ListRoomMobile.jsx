import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { managerRoomsService } from "../../services/ManagerRoomsService";
import "./ListRoom.css";
import { useSelector } from "react-redux";
import ListRoomMobileSearch from "./ListRoomMobileSearch";
import formatNumber from "./../../utils/formatNumber";

let count = 0;
export const ListRoomMobile = (props) => {
  const [listRoom, setListRoom] = useState([]);

  let { searchRoom } = useSelector(
    (rootReducer) => rootReducer.ClientSearchReducer
  );

  let { checkinString, checkoutString, guests } = searchRoom;

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

  const countPlaceTotal = () => {
    count = 0;
    listRoom.find((list, index) => {
      if (list.guests >= guests) {
        count++;
      }
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
  return (
    <div>
      <div className="p-3">
        <Header bkColor="white" color="black" />
        <ListRoomMobileSearch id="list_room_search" />
        {countPlaceTotal()}
        <span>
          Hơn {count} chỗ - {checkinString} - {checkoutString}
        </span>
        <h1>Chỗ ở tại khu vực bản đồ đã chọn</h1>
        <button className="btn btn-light mr-2">Loại nơi ở</button>
        <button className="btn btn-light mr-2">Giá</button>
        <button className="btn btn-light mr-2">Đặt ngay</button>
        <button className="btn btn-light mr-2">Phòng và phòng ngủ</button>
        <button className="btn btn-light mr-2">Bộ lọc khác</button>
      </div>
      <div className="pl-5 mt-5">
        <div className="row">
          <div className="col-6">
            {listRoom.map((list, index) => {
              if (list.guests >= guests) {
                return (
                  <div
                    className="row pt-3 mt-3"
                    style={{ borderTop: "1px solid black" }}
                    key={index}
                  >
                    <div className="col-6">
                      <img src={list.image} alt="" />
                    </div>
                    <div className="col-6">
                      <h6>{list.name}</h6>
                      <p>
                        {list.guests} Khách -{list.bedRoom} phòng ngủ -
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
                count++;
              }
            })}
          </div>
          <div className="col-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.553673986311!2d106.68808435!3d10.8007089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1643026906385!5m2!1svi!2s"
              width={"100%"}
              height={"100%"}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
