import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManagerRooms.css";
import { Table, Button, Input, Popconfirm, Image } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { history } from "../../App";
import { NavLink } from "react-router-dom";
import {
  deleteRoomByIdAction,
  getAllRoom,
  getRoomByPagination,
} from "../../redux/Actions/ManagerRoomsAction";
import {
  closeDrawer,
  openDrawer,
} from "../../redux/Actions/AdminControlAction";
import DrawerModel from "../../components/Drawer/DrawerModel";
import AddRoom from "./AddRoom/AddRoom";
import EditRoom from "./EditRoom/EditRoom";

const { Search } = Input;

const ManagerRooms = () => {
  const dispatch = useDispatch();
  const { arrRoom, arrRoomByPanigation } = useSelector(
    (state) => state.ManagerRoomsReducer
  );
  const [arrSearch, setArrSearch] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 1,
  });
  const [loading, setLoading] = useState(false);
  let data = [];

  const handleTableChange = ({ pagination }) => {
    setLoading(true);
    if (arrSearch) {
      setPagination({ pagination });
    } else {
      dispatch(getRoomByPagination(pagination));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSearch = (value) => {
    let key = value.toLowerCase();
    let arr = arrRoom.filter((item) => item.name?.toLowerCase().includes(key));
    if (arr?.length > 0) {
      setPagination({ ...pagination, total: arr.length });
      setArrSearch(arr);
    } else {
      setPagination({ ...pagination, total: 1 });
      setArrSearch([]);
    }
  };

  useEffect(async () => {
    dispatch(getAllRoom());
    dispatch(getRoomByPagination(pagination));
    setPagination({ ...pagination, total: arrRoom.length });
  }, []);

  if (arrSearch) {
    data = arrSearch;
  } else {
    data = arrRoomByPanigation;
  }

  const columns = [
    {
      title: "Mã phòng",
      dataIndex: "_id",
      width: "12%",
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: "20%",
      render: (text, room) => {
        return (
          <div className="d-flex justify-content-center align-items-center">
            {room.image ? (
              <Image
                width={75}
                src={room.image}
                placeholder={
                  <Image preview={false} src={room.image} width={500} />
                }
              />
            ) : (
              <Image
                width={75}
                height={75}
                src="error"
                fallback="data:image/png;base64,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"
              />
            )}
            <div className="ml-5">
              <Button shape="round" type="primary" ghost className="mx-1">
                Chỉnh sữa ảnh
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      title: "Location",
      dataIndex: "locationId",
      width: "15%",
      render: (text, room) => {
        return (
          <div>
            {room.locationId ? (
              <p>{room.locationId.province}</p>
            ) : (
              <p>Vị trí chưa cụ thể</p>
            )}
          </div>
        );
      },
    },
    {
      title: "GestMax",
      dataIndex: "guests",
      width: "5%",
    },
    {
      title: "",
      dataIndex: "_id",
      render: (text, room) => {
        return (
          <Fragment>
            <NavLink to={`/rooms/${room._id}`}>
              <Button shape="round" type="primary" ghost>
                Chi tiết
              </Button>
            </NavLink>
            <Button
              shape="round"
              icon={<EditOutlined />}
              type="primary"
              ghost
              className="mx-3"
              onClick={() =>
                dispatch(
                  openDrawer(
                    "Chỉnh sữa thông tin phòng",
                    <EditRoom id={room._id} />
                  )
                )
              }
            />
            <Popconfirm
              title="Bạn có muốn xóa phòng này？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                dispatch(deleteRoomByIdAction(room._id));
              }}
            >
              <Button danger shape="round" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="">Quản lý thông tin phòng</h3>
      <Button
        type="primary"
        ghost
        shape="round"
        className="mb-3"
        onClick={() => {
          dispatch(openDrawer("Thêm phòng", <AddRoom />));
        }}
      >
        Thêm phòng
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

export default ManagerRooms;
