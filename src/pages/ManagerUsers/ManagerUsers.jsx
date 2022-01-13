import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManagerUsers.css";
import { Table, Button, Input, Popconfirm } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { history } from "../../App";
import {
  deleteUserByIdAction,
  getAllUser,
  getUserByPagination,
  setLoading,
} from "../../redux/Actions/ManagerUsersAction";
import { NavLink } from "react-router-dom";
import AddUser from "./AddUser/AddUser";
import {
  closeDrawer,
  openDrawer,
} from "../../redux/Actions/AdminControlAction";
import DrawerModel from "../../components/Drawer/DrawerModel";
import EditUser from "./EditUser/EditUser";

const { Search } = Input;

const ManagerUsers = () => {
  const dispatch = useDispatch();
  const { arrUsers, loading } = useSelector(
    (state) => state.ManagerUsersReducer
  );

  const [arrUserSearch, setArrUserSearch] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 1,
  });
  let data = [];

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "5%",
      sorter: (user2, user1) => {
        let id1 = user1._id.toLowerCase();
        let id2 = user2._id.toLowerCase();
        if (id2 < id1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên",
      dataIndex: "name",
      width: "15%",
      sorter: (user2, user1) => {
        let name1 = user1.name?.trim().toLowerCase();
        let name2 = user2.name?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      render: (text, user, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center">
            {user.avatar ? (
              <img
                className=""
                src={user.avatar}
                alt={user.avatar}
                width={35}
                height={35}
                style={{ borderRadius: "50%" }}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = `https://picsum.photos/id/${index}/35/35`;
                }}
              />
            ) : (
              <img
                className=""
                src={`https://www.clipartmax.com/png/middle/97-971514_male-user-help-icon-h%C3%ACnh-%E1%BA%A3nh-d%E1%BA%A5u-nh%C3%A2n-%C4%91%E1%BB%8F.png`}
                alt="ko hinh"
                width={35}
                height={35}
                style={{ borderRadius: "50%" }}
              />
            )}
          </div>
        );
      },
      width: "8%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      width: "10%",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (text, user) => {
        return (
          <Fragment>{user.gender == true ? <p>Nam</p> : <p>Nữ</p>}</Fragment>
        );
      },
      width: "8%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (text, user) => {
        return (
          <Fragment>
            {user.address?.length > 50
              ? user.address?.substr(0, 50) + " ..."
              : user.address}
          </Fragment>
        );
      },
    },
    {
      title: "",
      dataIndex: "_id",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink to={`/users/${user._id}`}>
              <Button shape="round" type="primary" ghost>
                Chi tiết
              </Button>
            </NavLink>
            <Button
              shape="round"
              icon={<EditOutlined id={user._id} />}
              type="primary"
              ghost
              className="mx-3"
              onClick={() =>
                dispatch(
                  openDrawer("Chỉnh sữa thông tin", <EditUser id={user._id} />)
                )
              }
            />
            <Popconfirm
              title="Bạn có muốn xóa người dùng này？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                dispatch(deleteUserByIdAction(user._id));
              }}
            >
              <Button danger shape="round" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];

  const handleSearch = (value) => {
    let key = value.toLowerCase();
    let arr = arrUsers.filter((item) => item.name?.toLowerCase().includes(key));
    if (arr?.length > 0) {
      setPagination({ ...pagination, total: arr.length });
      setArrUserSearch(arr);
    } else {
      setPagination({ ...pagination, total: 1 });
      setArrUserSearch([]);
    }
  };

  const handleTableChange = ({ pagination }) => {
    dispatch(setLoading(true));
    setPagination({ pagination });
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  useEffect(() => {
    setPagination({ ...pagination, total: arrUsers.length });
  }, [arrUsers]);

  if (arrUserSearch) {
    data = arrUserSearch;
  } else {
    data = arrUsers;
  }

  return (
    <div>
      <h3 className="">Quản lý thông tin người dùng</h3>
      <Button
        type="primary"
        ghost
        shape="round"
        className="mb-3"
        onClick={() => {
          dispatch(openDrawer("Thêm người dùng", <AddUser />));
        }}
      >
        Thêm quản trị viên
      </Button>
      <Search
        className="mb-3"
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        rowKey={"_id"}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ManagerUsers;
