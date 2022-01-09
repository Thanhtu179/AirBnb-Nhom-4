import React, { useState, useEffect } from "react";
import { Button, Tooltip, DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { managerLocationService } from "./../../services/ManagerLocationService";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function HomeSearch() {
  const { Option } = Select;
  const [place, setPlace] = useState([]);
  const menu = (
    <Menu>
      {place.map((loc, index) => {
        return (
          <Menu.Item key={index}>{`${loc.name}, ${loc.province}`}</Menu.Item>
        );
      })}
    </Menu>
  );

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  function getLocation() {
    let promise = managerLocationService.getAllLocations();
    promise.then((result) => {
      setPlace(result.data);
    });
    promise.catch((err) => console.log({ err }));
  }

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div id="home_search">
      <div
        className="row m-auto p-3"
        style={{
          // width: "800px",
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
              Bạn sắp đi đâu? <DownOutlined />
            </a>
          </Dropdown>
        </div>

        <div
          className="col-xl-3 col-md-3"
          style={{ borderRight: "1px solid black" }}
        >
          <label>Nhận phòng</label>
          <DatePicker onChange={onChange} bordered={false} className="p-0" />
        </div>

        <div
          className="col-xl-3 col-md-3"
          style={{ borderRight: "1px solid black" }}
        >
          <label>Trả phòng</label>
          <DatePicker onChange={onChange} bordered={false} className="p-0" />
        </div>

        <div className="col-xl-3 col-md-3 d-flex">
          <div>
            <label>Khách</label>
            <input
              type="text"
              placeholder="Thêm khách"
              size="15"
              style={{ display: "block", border: "none" }}
            />
          </div>
          <Tooltip title="search">
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              danger="true"
              size="large"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
