import React, { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { managerLocationService } from "../../services/ManagerLocationService";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_SEARCH,
  CLICK_SEARCH_SCROLL,
} from "../../redux/Types/ClientSearchType";
const { RangePicker } = DatePicker;
let checkinString = "";
let checkoutString = "";
let place = "Bạn sắp đi đâu?";
let checkin;
let checkout;
let guests = "";
let guestsTotal = 0;

export default function HomePageSearch(props) {
  const { id, menu, color, marginTop } = props;
  let [placeList, setPlaceList] = useState([]);
  let { searchRoom } = useSelector(
    (rootReducer) => rootReducer.ClientSearchReducer
  );
  const dispatch = useDispatch();

  const dispatchToReducer = () => {
    if (guests == undefined) guests = "";
    let action = {
      type: SET_SEARCH,
      data: {
        place: place,
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        checkinString: checkinString,
        checkoutString: checkoutString,
        guestsTotal: guestsTotal,
      },
    };
    dispatch(action);
  };

  const onClickPlace = ({ key }) => {
    place = placeList.find((element, index) => index == key);
    place = place.name + ", " + place.province;
    dispatchToReducer();
  };
  const menuPlace = (
    <Menu onClick={onClickPlace}>
      {placeList.map((loc, index) => {
        return (
          <Menu.Item key={index}>
            <img
              src={
                loc.image != undefined
                  ? loc.image
                  : "https://picsum.photos/id/17/50/50"
              }
              width="50px"
              height="50px"
              className="mr-3"
              alt="..."
            />
            {`${loc.name}, ${loc.province}`}
          </Menu.Item>
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

  function onChangeCheckinCheckout(date, dateString) {
    console.log("date:", date[0]);
    checkin = date[0];
    checkinString = dateString[0];
    checkout = date[1];
    checkoutString = dateString[1];
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

  let [selectGuest, setSelectGuest] = useState({
    adult: 0,
    child: 0,
    baby: 0,
    pet: 0,
  });

  const selectButtonGuest = (index, item) => {
    if (item !== "adult" && selectGuest[item] == 0 && selectGuest.adult == 0) {
      selectGuest["adult"]++;
    }
    if (index == -1) {
      if (selectGuest[item] > 0) {
        selectGuest[item]--;
      }
    } else if (index == 1) {
      selectGuest[item]++;
    }
    setSelectGuest({ ...selectGuest });
    guests = getGuests();
    guestsTotal = selectGuest.adult + selectGuest.child;
    dispatchToReducer();
  };

  const isNotAdultSelect =
    selectGuest["adult"] == 1 &&
    (selectGuest["child"] > 0 ||
      selectGuest["baby"] > 0 ||
      selectGuest["pet"] > 0);

  const menuGuest = (
    <Menu
      onClick={onClickPlace}
      className="p-4"
      style={{
        borderRadius: "15px",
        backgroundColor: "#FFFFFF",
        width: "350px",
      }}
    >
      <li>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="font-weight-bold">Người lớn</div>
            <div>Từ 13 tuổi trở lên</div>
          </div>
          <div className="col-6 text-center">
            <button
              className={`btn btn_search_guest ${
                selectGuest.adult == 0 || isNotAdultSelect
                  ? "button_disabled"
                  : ""
              }`}
              onClick={() => selectButtonGuest(-1, "adult")}
            >
              -
            </button>
            <span className="mx-2">{selectGuest.adult}</span>
            <button
              className="btn btn_search_guest"
              onClick={() => selectButtonGuest(1, "adult")}
            >
              +
            </button>
          </div>
        </div>
        <hr style={{ marginBottom: "0px" }} />
      </li>
      <li>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="font-weight-bold">Trẻ em</div>
            <div>Độ tuổi 2 - 12</div>
          </div>
          <div className="col-6 text-center">
            <button
              className={`btn btn_search_guest ${
                selectGuest.child == 0 ? "button_disabled" : ""
              }`}
              onClick={() => selectButtonGuest(-1, "child")}
            >
              -
            </button>
            <span className="mx-2">{selectGuest.child}</span>
            <button
              className="btn btn_search_guest"
              onClick={() => selectButtonGuest(1, "child")}
            >
              +
            </button>
          </div>
        </div>
        <hr style={{ marginBottom: "0px" }} />
      </li>
      <li>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="font-weight-bold">Em bé</div>
            <div>Dưới 2</div>
          </div>
          <div className="col-6 text-center">
            <button
              className={`btn btn_search_guest ${
                selectGuest.baby == 0 ? "button_disabled" : ""
              }`}
              onClick={() => selectButtonGuest(-1, "baby")}
            >
              -
            </button>
            <span className="mx-2">{selectGuest.baby}</span>
            <button
              className="btn btn_search_guest"
              onClick={() => selectButtonGuest(1, "baby")}
            >
              +
            </button>
          </div>
        </div>
        <hr style={{ marginBottom: "0px" }} />
      </li>
      <li>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="font-weight-bold">Thú cưng</div>
            <a style={{ textDecoration: "underline", color: "black" }}>
              Bạn muốn mang theo động vật hỗ trợ?
            </a>
          </div>
          <div className="col-6 text-center">
            <button
              className={`btn btn_search_guest ${
                selectGuest.pet == 0 ? "button_disabled" : ""
              }`}
              onClick={() => selectButtonGuest(-1, "pet")}
            >
              -
            </button>
            <span className="mx-2">{selectGuest.pet}</span>
            <button
              className="btn btn_search_guest"
              onClick={() => selectButtonGuest(1, "pet")}
            >
              +
            </button>
          </div>
        </div>
        <span style={{ color: "gray" }}>
          Nếu bạn may mắn có nhiều hơn 2 thú cưng đi cùng, hãy nhớ cho Chủ nhà
          biết
        </span>
      </li>
    </Menu>
  );

  const getGuests = () => {
    let res = "";
    if (selectGuest["adult"] > 0) {
      res += selectGuest["adult"] + selectGuest["child"] + " khách,";
      if (selectGuest["baby"] > 0) {
        res += selectGuest["baby"] + " em bé,";
      }
      if (selectGuest["pet"] > 0) {
        res += selectGuest["pet"] + " thú cưng";
      }
    }
    return res;
  };

  let [menuIndex, setMenuIndex] = useState(1);
  const clickHomeSearchScroll = () => {
    dispatch({
      type: CLICK_SEARCH_SCROLL,
      data: true,
    });
  };

  const renderMenu = () => {
    return (
      <ul className="d-flex justify-content-center">
        <li
          className={`px-2 ${
            color == "black" ? "menu_item_black" : "menu_item_white"
          }`}
          style={{ color: color }}
          onClick={() => setMenuIndex(1)}
        >
          Nơi ở
        </li>
        <li
          className={`px-2 ${
            color == "black" ? "menu_item_black" : "menu_item_white"
          }`}
          style={{ color: color }}
          onClick={() => setMenuIndex(2)}
        >
          Trải nghiệm
        </li>
        <li
          className={`px-2 ${
            color == "black" ? "menu_item_black" : "menu_item_white"
          }`}
          style={{ color: color }}
          onClick={() => setMenuIndex(1)}
        >
          Trải nghiệm trực tuyến
        </li>
      </ul>
    );
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div className="menu_list">
      {menu ? renderMenu() : ""}
      <div
        style={{ marginTop: marginTop }}
        id={id}
        className={
          id == "home_search" || id == "list_room_search"
            ? "active"
            : "not_active"
        }
      >
        <div
          id="search_1"
          className={`row flex-nowrap p-3 ${menuIndex == 1 ? "active" : ""}`}
        >
          <div
            className="col-xl-3 col-md-3"
            style={{ borderRight: "1px solid black", overflow: "hidden" }}
          >
            <label>Địa điểm</label>
            <br />
            <Dropdown overlay={menuPlace} trigger={["click"]} size="10">
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
            style={{ borderRight: "1px solid black", overflow: "hidden" }}
          >
            <label>Nhận phòng</label>
            <DatePicker
              value={searchRoom.checkin}
              onChange={onChangeCheckin}
              bordered={false}
              className="p-0"
              placeholder="Thêm ngày"
            />
          </div>

          <div
            className="col-xl-3 col-md-3"
            style={{ borderRight: "1px solid black", overflow: "hidden" }}
          >
            <label>Trả phòng</label>
            <DatePicker
              value={searchRoom.checkout}
              onChange={onChangeCheckout}
              bordered={false}
              className="p-0"
              placeholder="Thêm ngày"
            />
          </div>

          <div className="col-xl-3 col-md-3" style={{ position: "relative" }}>
            <div>
              <Dropdown overlay={menuGuest} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Khách
                  <input
                    type="text"
                    placeholder="Thêm khách"
                    size="15"
                    style={{
                      display: "block",
                      border: "none",
                      marginTop: "10px",
                    }}
                    value={searchRoom.guests}
                  />
                </a>
              </Dropdown>
              <br />
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
          className={`row flex-nowrap p-3 ${menuIndex == 2 ? "active" : ""}`}
        >
          <div
            className="col-xl-6 col-md-6"
            style={{ borderRight: "1px solid black", overflow: "hidden" }}
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

          <div className="col-xl-6 col-md-6" style={{ position: "relative" }}>
            <div className="col-xl-12 col-md-12">
              <label style={{ display: "block" }}>Ngày</label>
              <RangePicker
                value={[searchRoom.checkin, searchRoom.checkout]}
                onChange={onChangeCheckinCheckout}
                bordered={false}
                className="p-0"
                size="32"
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
      </div>
      <button
        id="search_3"
        style={{ marginTop: marginTop }}
        className={`row flex-nowrap p-3 justify-content-between ${
          id == "home_search_scroll" ? "active" : "not_active"
        }`}
        onClick={() => {
          clickHomeSearchScroll();
        }}
      >
        Bắt đầu tìm kiếm
        <Button
          type="danger"
          shape="circle"
          size="large"
          onClick={searchListRoom}
          icon={<SearchOutlined />}
          style={{ marginRight: "-10px" }}
        />
      </button>
    </div>
  );
}
