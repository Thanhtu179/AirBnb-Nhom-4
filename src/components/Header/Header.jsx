import React from "react";
import "./Header.css";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

export default function Header(props) {
  let { menu, bkColor, color } = props;
  let src = "";
  function renderMenu(menu) {
    if (menu) {
      return (
        <div
          className="collapse navbar-collapse"
          id="collapsibleNavbar"
          style={{ justifyContent: "center" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: color }}>
                Nơi ở
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: color }}>
                Trải nghiệm
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: color }}>
                Trải nghiệm trực tuyến
              </a>
            </li>
          </ul>
        </div>
      );
    }
  }

  if (bkColor == "black") {
    src = "./img/logo-full-white.png";
  } else if (bkColor == "white") {
    src = "./../img/logo-full-red.png";
  }

  return (
    <div id="header" style={{ backgroundColor: bkColor }}>
      <div>
        <nav
          className="navbar navbar-expand-md navbar-dark"
          style={{ justifyContent: "space-between" }}
        >
          {/* Brand */}
          <a className={`navbar-brand header_logo`} href="/">
            <img src={src} alt="..." />
          </a>

          {/* Toggler/collapsibe Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Navbar links */}
          {renderMenu(menu)}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: color }}>
                Đón tiếp khách
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: color }}>
                <i className="fas fa-globe"></i>
              </a>
            </li>
            <li className="nav-item">
              <div
                className={`header_user navbar-toggler`}

                // data-toggle="collapse"
              >
                <MenuOutlined className="mr-3" />
                <UserOutlined />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export const HeaderFix = () => {
  return <div>HeaderFix</div>;
};
