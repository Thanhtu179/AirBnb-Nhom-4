import { useFormik } from "formik";
import React, { Fragment, useRef, useEffect, useState } from "react";
import moment from "moment";
import { Form, Input, Button, Select, DatePicker } from "antd";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserInfoAction,
  updateUserByIdAction,
} from "../../../redux/Actions/ManagerUsersAction";

const { Option } = Select;

const EditUser = (props) => {
  const { userInfoById } = useSelector((state) => state.ManagerUsersReducer);
  const dispatch = useDispatch();
  const handleChangeSelector = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeDatePicker = (name) => {
    return (value) => {
      formik.setFieldValue(name, moment(value).format("YYYY-MM-DD:HH:mm:ss"));
    };
  };

  useEffect(async () => {
    let { id } = props;
    dispatch(getUserInfoAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userInfoById.name,
      email: userInfoById.email,
      password: userInfoById.password,
      phone: userInfoById.phone,
      birthday: userInfoById.birthday,
      gender: userInfoById.gender,
      type: userInfoById.type,
      address: userInfoById.address,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Không được bỏ trống!"),
      email: Yup.string()
        .required("Không được bỏ trống!")
        .email("Vui lòng nhập đúng định dạng email"),
      password: Yup.string().required("Không được bỏ trống !"),
      phone: Yup.string().required("Không được bỏ trống!"),
      birthday: Yup.string().required("Không được bỏ trống!"),
      address: Yup.string().required("Không được bỏ trống!"),
    }),
    onSubmit: (values) => {
      dispatch(updateUserByIdAction(userInfoById._id, values));
    },
  });

  return (
    <div>
      <h3 className="ml-5 my-5">Chỉnh Sữa Thông Tin:</h3>
      <Form onFinish={formik.handleSubmit}>
        <Form.Item label="Tên">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Email">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-danger">{formik.errors.phone}</div>
          ) : null}
        </Form.Item>
        <div className="row">
          <div className="col-6">
            <Form.Item label="Ngày sinh">
              <DatePicker
                onChange={handleChangeDatePicker("birthday")}
                value={moment(formik.values.birthday)}
                name="birthday"
              />
              {formik.errors.birthday && formik.touched.birthday ? (
                <div className="text-danger">{formik.errors.birthday}</div>
              ) : null}
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item label="Giới tính">
              <Select
                style={{ width: "50%" }}
                onChange={handleChangeSelector("gender")}
                value={formik.values.gender}
                name="gender"
              >
                <Option value={true}>Nam</Option>
                <Option value={false}>Nữ</Option>
              </Select>
              {formik.errors.gender && formik.touched.gender ? (
                <div className="text-danger">{formik.errors.gender}</div>
              ) : null}
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Địa chỉ">
          <Input.TextArea
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            name="address"
          />
          {formik.errors.address && formik.touched.address ? (
            <div className="text-danger">{formik.errors.address}</div>
          ) : null}
        </Form.Item>
        <div className="row">
          <div className="col-12 mt-3 d-flex justify-content-center">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditUser;
