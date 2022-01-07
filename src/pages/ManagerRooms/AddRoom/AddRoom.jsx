import React, { useRef } from "react";
import { Form, Input, Button, Select, InputNumber, Switch } from "antd";
import _ from "lodash";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { getAllLocations } from "../../../redux/Actions/ManagerLocationAction";
import { addRoomAction } from "../../../redux/Actions/ManagerRoomsAction";

const { Option } = Select;
const { TextArea } = Input;

const AddRoom = (props) => {
  const { arrLocation } = useSelector((state) => state.ManagerLocationReducer);
  const locationOptions = _.uniqBy(arrLocation, "_id").map((item) => {
    return {
      id: item._id,
      name: `${item.name} - ${item.province} - ${item.country}`,
    };
  });
  const dispatch = useDispatch();

  const onReset = () => {
    console.log("reset");
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeSelector = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      guests: 1,
      bedRoom: 1,
      bath: 1,
      description: "",
      price: 100000,
      elevator: false,
      hotTub: false,
      pool: false,
      indoorFireplace: false,
      dryer: false,
      gym: false,
      kitchen: false,
      wifi: false,
      heating: false,
      cableTV: false,
      locationId: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên không được bõ trống"),
      description: Yup.string().required("Mô tả không được bỏ trống"),
    }),
    onSubmit: (values) => {
      // console.log("values", values);
      dispatch(addRoomAction(values));
    },
  });

  useEffect(async () => {
    dispatch(getAllLocations());
  }, []);

  return (
    <div className="container">
      <Form onFinish={formik.handleSubmit}>
        <h4 className="mb-4">
          <i className="fab fa-airbnb mr-2"></i>Thông tin phòng
        </h4>
        <div className="row">
          <div className="col-8">
            {formik.errors.name && formik.touched.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
            <Form.Item label="Tên Phòng">
              <Input
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item label="Giá phòng">
              <InputNumber
                style={{ width: 100 }}
                min={100000}
                max={10000000}
                defaultValue={100000}
                onChange={handleChangeInputNumber("price")}
                name="price"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Form.Item label="Số người ở">
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={handleChangeInputNumber("guests")}
                name="guests"
              />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item label="Số bồn tắm">
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={handleChangeInputNumber("bath")}
                name="bath"
              />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item label="Giường ngủ">
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={handleChangeInputNumber("bedRoom")}
                name="bedRoom"
              />
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item label="Vị trí du lịch">
              <Select name="locationId" onChange={handleChangeSelector}>
                {locationOptions?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-12">
            {formik.errors.description && formik.touched.description ? (
              <div className="text-danger">{formik.errors.description}</div>
            ) : null}
            <Form.Item label="Mô tả">
              <TextArea
                rows={4}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </div>
        </div>

        <h4 className="ml-2 mb-4">
          <i className="fa fa-suitcase-rolling mr-2"></i>Các dịch vụ của phòng:
        </h4>
        <div className="row">
          <div className="col-6">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tên dịch vụ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thang máy</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="elevator"
                      onChange={handleChangeSwitch("elevator")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Bồn nước nóng</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="hotTub"
                      onChange={handleChangeSwitch("hotTub")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hồ bơi</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="pool"
                      onChange={handleChangeSwitch("pool")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Lò sưởi trong nhà</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="indoorFireplace"
                      onChange={handleChangeSwitch("indoorFireplace")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Máy sấy khô</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="dryer"
                      onChange={handleChangeSwitch("dryer")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tên dịch vụ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Phòng tập thể hình</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="gym"
                      onChange={handleChangeSwitch("gym")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Nhà bếp</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="kitchen"
                      onChange={handleChangeSwitch("kitchen")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Wifi</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="wifi"
                      onChange={handleChangeSwitch("wifi")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Máy sưởi</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="heating"
                      onChange={handleChangeSwitch("heating")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Truyền hình cáp</td>
                  <td className="d-flex justify-content-center">
                    <Switch
                      size="small"
                      name="cableTV"
                      onChange={handleChangeSwitch("cableTV")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center mt-5">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Thêm phòng
              </Button>
              <Button
                type="primary"
                size="large"
                className="ml-3"
                onClick={onReset}
                htmlType="button"
              >
                Reset
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddRoom;
