import React, { useState, useEffect } from "react";
import { Button, Tooltip, DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { managerLocationService } from "../../services/ManagerLocationService";
import { Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { SET_SEARCH } from "../../redux/Types/ClientSearchType";
let checkinString = "";
let checkoutString = "";

export default function HomePageSearch(props) {
  const { id } = props;
  const { Option } = Select;
  let [placeList, setPlaceList] = useState([]);
  let [place, setPlace] = useState("");
  let [checkin, setCheckin] = useState("");
  let [checkout, setCheckout] = useState("");
  let [guests, setGuests] = useState(0);
  let { searchRoom } = useSelector(
    (rootReducer) => rootReducer.ClientSearchReducer
  );
  console.log("searchRoom: ", searchRoom);
  place = searchRoom.place;
  checkin = searchRoom.checkin;
  checkout = searchRoom.checkout;
  guests = searchRoom.guests;

  if (place === "") place = "Bạn sắp đi đâu?";

  const dispatch = useDispatch();

  const dispatchToReducer = () => {
    if (guests == undefined) guests = 0;
    let action = {
      type: SET_SEARCH,
      data: {
        place: place,
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        checkinString: checkinString,
        checkoutString: checkoutString,
      },
    };
    dispatch(action);
  };

  const onClickPlace = ({ key }) => {
    place = placeList.find((element, index) => index == key).name;
    dispatchToReducer();
  };
  const menu = (
    <Menu onClick={onClickPlace}>
      {placeList.map((loc, index) => {
        return (
          <Menu.Item key={index}>{`${loc.name}, ${loc.province}`}</Menu.Item>
        );
      })}
    </Menu>
  );

  function onChangeCheckin(date, dateString) {
    checkin = date;
    checkinString = dateString;
    dispatchToReducer();
  }
  function onChangeCheckout(date, dateString) {
    checkout = date;
    checkoutString = dateString;
    dispatchToReducer();
  }

  function onChangeGuest(event) {
    guests = event.target.value;

    dispatchToReducer();
  }

  const getLocation = async () => {
    let promise = managerLocationService.getAllLocations();
    promise.then((result) => {
      setPlaceList(result.data);
    });
    promise.catch((err) => console.log("Error in getLocation:", err));
  };

  const searchListRoom = () => {
    props.props.history.push("/list-room/");
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div id={id}>
      <div
        id="search_1"
        className="row flex-nowrap p-3"
        style={{
          height: "80px",
          border: "1px solid black",
          borderRadius: "50px",
          backgroundColor: "white",
        }}
      >
        <div
          className="col-xl-3 col-md-3"
          style={{ borderRight: "1px solid black" }}
        >
          <label>Địa điểm</label>
          <br />
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {place} <DownOutlined />
            </a>
          </Dropdown>
        </div>

        <div
          className="col-xl-3 col-md-3"
          style={{ borderRight: "1px solid black" }}
        >
          <label>Nhận phòng</label>
          <DatePicker
            value={checkin}
            onChange={onChangeCheckin}
            bordered={false}
            className="p-0"
          />
        </div>

        <div
          className="col-xl-3 col-md-3"
          style={{ borderRight: "1px solid black" }}
        >
          <label>Trả phòng</label>
          <DatePicker
            value={checkout}
            onChange={onChangeCheckout}
            bordered={false}
            className="p-0"
          />
        </div>

        <div className="col-xl-3 col-md-3" style={{ position: "relative" }}>
          <div>
            <label>Khách</label>
            <input
              type="text"
              placeholder="Thêm khách"
              size="15"
              style={{ display: "block", border: "none" }}
              value={guests}
              onChange={onChangeGuest}
            />
          </div>
          <div className="btn_search">
            <Button
              type="danger"
              shape="circle"
              size="large"
              onClick={searchListRoom}
              icon={<SearchOutlined />}
            />
          </div>
        </div>
      </div>

      <div
        id="search_2"
        className="row flex-nowrap p-3"
        style={{
          height: "80px",
          border: "1px solid black",
          borderRadius: "50px",
          backgroundColor: "white",
          position: "relative",
          width: "180px",
        }}
      >
        <div>
          <label>Địa điểm</label>
          <br />
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {place} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div className="btn_search">
          <Button
            type="danger"
            shape="circle"
            size="large"
            onClick={searchListRoom}
            icon={<SearchOutlined />}
          />
        </div>
      </div>
    </div>
  );
}
