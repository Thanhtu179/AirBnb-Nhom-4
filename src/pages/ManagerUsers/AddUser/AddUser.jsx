import { useFormik } from "formik";
import React, { Fragment, useRef } from "react";
import moment from "moment";
import { Form, Input, Button, Select, DatePicker } from "antd";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/Actions/ManagerUsersAction";

const { Option } = Select;

const AddUser = () => {
  const dispatch = useDispatch();

  const handleChangeSelector = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeDatePicker = (name) => {
    return (value) => {
      formik.setFieldValue(name, moment(value).format("YYYY-MM-DD"));
    };
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      type: "ADMIN",
      address: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Không được bỏ trống!"),
      email: Yup.string()
        .required("Không được bỏ trống!")
        .email("Vui lòng nhập đúng định dạng email"),
      password: Yup.string()
        .required("Không được bỏ trống !")
        .min(6, "Mật khẩu từ 6 đến 32 ký tự")
        .max(32, "Mật khẩu từ 6 đến 32 ký tự"),
      phone: Yup.string().required("Không được bỏ trống!"),
      birthday: Yup.string().required("Không được bỏ trống!"),
      address: Yup.string().required("Không được bỏ trống!"),
    }),
    onSubmit: (values) => {
      dispatch(addUser(values));
    },
  });

  return (
    <div>
      <h3 className="ml-5 my-5">Thêm quản trị viên:</h3>
      <Form onFinish={formik.handleSubmit} className="mx-5">
        <Form.Item label="Tên">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
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
                defaultValue={true}
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
            name="address"
          />
          {formik.errors.address && formik.touched.address ? (
            <div className="text-danger">{formik.errors.address}</div>
          ) : null}
        </Form.Item>
        <div className="row ">
          <div className="col-12 justify-content-center d-flex mt-3">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Submit
              </Button>
              <Button htmlType="button" className="ml-3" size="large">
                Reset
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddUser;
