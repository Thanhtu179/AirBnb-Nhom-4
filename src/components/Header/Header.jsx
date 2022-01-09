import React from "react";
import "./Header.css";
import { UserOutlined } from "@ant-design/icons";

export default function Header(props) {
  let { menu } = props;
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
              <a className="nav-link text-white" href="#">
                Nơi ở
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Trải nghiệm
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Trải nghiệm trực tuyến
              </a>
            </li>
          </ul>
        </div>
      );
    }
  }
  return (
    <div id="header">
      <div>
        <nav className="navbar navbar-expand-md navbar-dark">
          {/* Brand */}
          <a className={`navbar-brand header_logo`} href="#">
            <img src="./img/logo-full-white.png" alt="..." />
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
              <a className="nav-link text-white" href="#">
                Đón tiếp khách
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                <i class="fas fa-globe"></i>
              </a>
            </li>
            <li className="nav-item">
              <button
                className="navbar-toggler"
                style={{ display: "inline-block" }}
                type="button"
                data-toggle="collapse"
              >
                <span className="navbar-toggler-icon mr-3" />
                <UserOutlined />
              </button>
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
