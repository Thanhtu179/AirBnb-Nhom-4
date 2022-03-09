import React, { useState, useEffect } from "react";
import "./Header.css";
import { Menu, Dropdown } from "antd";
import { history } from "./../../App";
import { TOKEN, USER_INFO, USER_LOGIN } from "../../utils/settingSystem";

export default function Header(props) {
  let { bkColor, color, changeAvatar, mobile } = props;
  let src = "";
  let isLogin = false;
  if (localStorage.getItem(USER_INFO)) {
    isLogin = true;
  }
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem(USER_INFO)) {
      setUserInfo(JSON.parse(localStorage.getItem(USER_INFO)));
    }
  }, [changeAvatar]);

  if (bkColor === "black") {
    src = "./img/logo-full-white.png";
  } else if (bkColor === "white") {
    src = "./../img/logo-full-red.png";
  }

  const menuBarNotLogin = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => history.push("/login")}>
          <i className="fas fa-arrow-right mr-2" />
          Đăng nhập
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div onClick={() => history.push("/register")}>
          <i className="fas fa-arrow-right mr-2" />
          Đăng ký
        </div>
      </Menu.Item>
      )
    </Menu>
  );

  const menuBarLogin = (
    <Menu>
      {userInfo.type == "ADMIN" ? (
        <Menu.Item key="0">
          <div
            onClick={() => {
              history.push(`/admin`);
            }}
          >
            <i className="fas fa-arrow-right mr-2" /> Trang quản trị admin
          </div>
        </Menu.Item>
      ) : (
        <></>
      )}
      <Menu.Item key="1">
        <div
          onClick={() => {
            history.push(`/users/${userInfo._id}`);
          }}
        >
          <i className="fas fa-arrow-right mr-2" /> Cập nhật thông tin
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <div
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_INFO);
            history.push("/home");
            window.location.reload();
          }}
        >
          <i className="fas fa-arrow-right mr-2" /> Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );

  const style = {
    backgroundColor: bkColor,
    color: color,
  };
  const mobileStyle = {
    backgroundColor: bkColor,
    color: color,
    paddingBottom: "55px",
  };

  return (
    <div id="header" style={mobile ? mobileStyle : style}>
      {/* <div> */}
      <nav
        className="d-flex"
        style={{ justifyContent: "space-between", padding: "0.5rem 1rem" }}
      >
        {/* Brand */}
        <a className={`navbar-brand header_logo`} href="/">
          <img src={src} alt="..." />
        </a>

        <ul
          className="d-flex flex-row mb-0"
          style={{ marginLeft: "-20px", alignItems: "end" }}
        >
          {mobile ? (
            ""
          ) : (
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                style={{ color: color, padding: "0.5rem" }}
              >
                Đón khách
              </a>
            </li>
          )}
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              style={{ color: color, padding: "0.5rem" }}
            >
              <i className="fas fa-globe"></i>
            </a>
          </li>
          <li className="header_user">
            <Dropdown overlay={isLogin ? menuBarLogin : menuBarNotLogin}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <i
                  class="fa-solid fa-bars fa-lg"
                  style={{ verticalAlign: "middle" }}
                ></i>
                <img
                  className="icon_user"
                  src={
                    userInfo.avatar
                      ? userInfo.avatar
                      : "https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-user-id-login-image-png-image_1648074.jpg"
                  }
                  alt="..."
                />
              </a>
            </Dropdown>
          </li>
        </ul>
      </nav>
      {/* </div> */}
    </div>
  );
}
