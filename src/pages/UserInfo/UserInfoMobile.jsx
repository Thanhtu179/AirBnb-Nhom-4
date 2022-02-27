import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { managerUsersService } from "../../services/ManagerUsersService";
import "./UserInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../redux/Actions/ManagerUsersAction";
import { Form, Button, Image } from "antd";
import { useFormik } from "formik";
import {
  closeDrawer,
  openDrawer,
} from "../../redux/Actions/AdminControlAction";
import EditUser from "./../ManagerUsers/EditUser/EditUser";
import DrawerModel from "../../components/Drawer/DrawerModel";
import { SET_USER_INFO } from "../../redux/Types/ManagerUsersType";
import { USER_LOGIN } from "../../utils/settingSystem";

const UserInfoMobile = (props) => {
  let { id } = props.match.params;
  const [changeAvatar, setChangeAvatar] = useState(false);
  const dispatch = useDispatch();
  let [profile, setProfile] = useState({});
  const { modalDrawer } = useSelector((state) => state.AdminControlReducer);
  const { drawerVisible, drawerContent, drawerTitle } = modalDrawer;

  const getProfile = (id) => {
    let promise = managerUsersService.getUserInfoById(id);
    promise
      .then((result) => {
        setProfile(result.data);
      })
      .catch((error) => {
        console.log("Lỗi Api số 2 lấy thông tin chi tiết người dùng: ", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: async (values) => {
      let user = {};
      if (localStorage.getItem(USER_LOGIN)) {
        user = JSON.parse(localStorage.getItem(USER_LOGIN));
      }
      if (user._id != id) {
        alert(
          "Bạn phải đăng nhập tài khoản " +
            profile.name +
            " mới update avatar được"
        );
        return;
      }
      let formData = new FormData();
      formData.append("avatar", values.image, values.image.name);
      await dispatch(updateAvatar(formData));
      let userInfoLogin = await managerUsersService.getUserInfoById(id);
      if (userInfoLogin.status === 200) {
        console.log("userInfoLogin:", userInfoLogin);
        await dispatch({
          type: SET_USER_INFO,
          userInfo: userInfoLogin.data,
        });
      }
      setChangeAvatar(!changeAvatar);
      getProfile(id);
    },
  });

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {};
      formik.setFieldValue("image", file);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeDrawer());
  };

  useEffect(() => {
    getProfile(id);
  }, []);
  useEffect(() => {
    getProfile(id);
  }, [drawerVisible]);

  return (
    <div className="p-3">
      <Header bkColor="white" color="black" changeAvatar={changeAvatar} />
      <div className="row">
        <div className="col-12">
          <div className="card text-dark p-2">
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              className="my-1"
              onFinish={formik.handleSubmit}
            >
              <Form.Item
                wrapperCol={{
                  span: 8,
                  offset: 6,
                }}
              >
                {profile.avatar ? (
                  <Image
                    width={150}
                    height={150}
                    src={profile.avatar}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <Image
                    width={150}
                    height={150}
                    src="error"
                    fallback="data:image/png;base64,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"
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 16,
                  offset: 7,
                }}
              >
                <div class="file-input">
                  <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    class="file-input__input"
                    onChange={handleChangeFile}
                    accept="image/png, image/jpeg,image/gif,image/png"
                  />
                  <label class="file-input__label" for="file-input">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="upload"
                      class="svg-inline--fa fa-upload fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                      ></path>
                    </svg>
                    <span>Chọn file hình ảnh</span>
                  </label>
                </div>
                <Button size="large" htmlType="submit" type="primary" ghost>
                  Cập nhật hình ảnh
                </Button>
              </Form.Item>
            </Form>

            <div className="card-body mt-0 pt-0">
              <i className="far fa-check-circle fa-2x"></i>
              <h4 className="card-title">Xác minh danh tính</h4>
              <p className="card-text">
                Xác thực danh tính của bạn với huy hiệu xác minh danh tính
              </p>
              <button className="btn btn-light">Nhận huy hiệu</button>
              <hr />
              <h4 className="card-title">
                {profile.name ? profile.name.split(" ").at(-1) : " "} đã xác
                nhận
              </h4>
              <i class="fas fa-check"></i>
              <span> Địa chỉ email</span>
            </div>
          </div>
        </div>

        <div className="col-12">
          <h3>
            Xin chào, tôi là{" "}
            {profile.name ? profile.name.split(" ").at(-1) : ""}
          </h3>
          <div>Bắt đầu tham gia vào 2021</div>
          <div>Họ và tên: {profile.name}</div>
          <div>Email: {profile.email}</div>
          <div>Phone: {profile.phone}</div>
          <div>Ngày sinh: {profile.birthday.split("T").at(0)}</div>
          <div>Giới tính: {profile.gender ? "Nam" : "Nữ"}</div>
          <div>Địa chỉ: {profile.address}</div>
          <Button
            shape="round"
            type="primary"
            ghost
            className="mt-3"
            onClick={() =>
              dispatch(openDrawer("Chỉnh sửa hồ sơ", <EditUser id={id} />))
            }
          >
            Chỉnh sửa hồ sơ
          </Button>
          <div className="mt-3">
            <i class="fas fa-star" style={{ color: "orange" }}></i>
            <a href="" className="mb-5">
              {" "}
              0 đánh giá
            </a>
          </div>
          <hr />
          <div
            className="mb-5"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Đánh giá của bạn
          </div>
          <DrawerModel
            title={drawerTitle}
            Component={drawerContent}
            onClose={handleCloseModal}
            visible={drawerVisible}
            width={"100%"}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UserInfoMobile;
