import React, { Fragment, useEffect, useState } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import _ from "lodash";
import {
  FileSyncOutlined,
  HomeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import { TOKEN, USER_INFO, USER_LOGIN } from "../../utils/settingSystem";
import { history } from "../../App";
import "./AdminTemplate.css";
import logoAirbnb from "../../assets/img/logo-full.png";
import { useDispatch, useSelector } from "react-redux";
import DrawerModel from "../../components/Drawer/DrawerModel";
import { closeDrawer } from "../../redux/Actions/AdminControlAction";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
  const { Component, ...restParam } = props;
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { modalDrawer } = useSelector((state) => state.AdminControlReducer);
  const { drawerVisible, drawerContent, drawerTitle } = modalDrawer;
  const pageAdminList = [
    { index: 4, path: "/admin" },
    { index: 4, path: "/admin/users" },
    { index: 5, path: "/admin/rooms" },
    { index: 6, path: "/admin/locations" },
  ];
  let pageActive = pageAdminList.findIndex((item) => item.path == props.path);

  let userInfo = {};
  const menuAdminControl = (
    <>
      <Menu>
        <Menu.Item key="0">
          <div
            onClick={() => {
              console.log("id", userInfo._id);
              history.push(`/users/${userInfo._id}`);
            }}
          >
            <i className="fas fa-arrow-right mr-2" /> Cập nhật thông tin
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
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
    </>
  );

  const handleCloseModal = () => {
    dispatch(closeDrawer());
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_INFO)) {
    alert("Bạn chưa đăng nhập vui lòng đăng nhập !");
    return <Redirect to="/" />;
  } else {
    userInfo = JSON.parse(localStorage.getItem(USER_INFO));
    if (userInfo.type !== "ADMIN") {
      alert("Bạn khong co quyen truy cap trang nay !");
      return <Redirect to="/" />;
    }
  }

  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo p-3 logo-collapsed">
                  {collapsed ? (
                    <img src={logoAirbnb} alt="..." />
                  ) : (
                    <img src={logoAirbnb} alt="..." width={150} />
                  )}
                </div>
                <Menu
                  theme="dark"
                  defaultSelectedKeys={[
                    pageAdminList[pageActive].index.toString(),
                  ]}
                  mode="inline"
                >
                  <Menu.Item key="4" icon={<UserSwitchOutlined />}>
                    <NavLink to="/admin/users">Quản lý người dùng</NavLink>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<HomeOutlined />}>
                    <NavLink to="/admin/rooms">Quản lý phòng</NavLink>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<FileSyncOutlined />}>
                    <NavLink to="/admin/locations">Quản lý vị trí</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background d-flex align-items-center justify-content-end"
                  style={{ padding: 0 }}
                >
                  <div className="admin__controler">
                    <div className="admin__controler__user-name">
                      <span>{userInfo.name}</span>
                    </div>
                    <Dropdown overlay={menuAdminControl} trigger={["click"]}>
                      <a
                        className="ant-dropdown-link admin__controler__dropdown mr-3"
                        onClick={(e) => e.preventDefault()}
                      >
                        <div className="admin__controler__dropdown__icon">
                          <i className="fas fa-bars"></i>
                        </div>
                        <div className="admin__controler__dropdown__image">
                          {userInfo.avatar ? (
                            <img src={userInfo.avatar} alt={userInfo.avatar} />
                          ) : (
                            <img
                              src="https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-user-id-login-image-png-image_1648074.jpg"
                              alt=""
                            />
                          )}
                        </div>
                      </a>
                    </Dropdown>
                  </div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: "85vh" }}
                  >
                    <DrawerModel
                      title={drawerTitle}
                      Component={drawerContent}
                      onClose={handleCloseModal}
                      visible={drawerVisible}
                    />
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Airbnb ©2018 Created by Dinh Thanh Tu
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
