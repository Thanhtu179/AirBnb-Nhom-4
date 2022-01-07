import React, { useRef } from "react";
import { Form, Input, Button, Select, InputNumber, Switch } from "antd";
import _ from "lodash";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { getAllLocations } from "../../../redux/Actions/ManagerLocationAction";
import {
  getRoomByIdAction,
  updateRoomByIdAction,
} from "../../../redux/Actions/ManagerRoomsAction";

const { Option } = Select;
const { TextArea } = Input;

const EditRoom = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const { arrLocation } = useSelector((state) => state.ManagerLocationReducer);
  const { roomData } = useSelector((state) => state.ManagerRoomsReducer);
  const locationIdUpdate = arrLocation.filter(
    (item) => item.name === roomData.locationId?.name
  );

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: roomData.name,
      guests: roomData.guests,
      bedRoom: roomData.bedRoom,
      bath: roomData.bath,
      description: roomData.description,
      price: roomData.price,
      elevator: roomData.elevator,
      hotTub: roomData.hotTub,
      pool: roomData.pool,
      indoorFireplace: roomData.indoorFireplace,
      dryer: roomData.dryer,
      gym: roomData.gym,
      kitchen: roomData.kitchen,
      wifi: roomData.wifi,
      heating: roomData.heating,
      cableTV: roomData.cableTV,
      locationId: locationIdUpdate[0]?._id,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên không được bõ trống"),
      description: Yup.string().required("Mô tả không được bỏ trống"),
    }),
    onSubmit: (values) => {
      // console.log("values", values);
      dispatch(updateRoomByIdAction(id, values));
    },
  });

  useEffect(() => {
    dispatch(getRoomByIdAction(id));
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
                value={formik.values.name}
              />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item label="Giá phòng">
              <InputNumber
                style={{ width: 100 }}
                min={100000}
                max={10000000}
                value={formik.values.price}
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
                value={formik.values.guests}
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
                value={formik.values.bath}
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
                value={formik.values.bedRoom}
                onChange={handleChangeInputNumber("bedRoom")}
                name="bedRoom"
              />
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item label="Vị trí du lịch">
              <Input
                name="locationId"
                disabled
                value={`${roomData.locationId?.name} - ${roomData.locationId?.province} - ${roomData.locationId?.country}`}
              />
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
                value={formik.values.description}
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
                      checked={formik.values.elevator}
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
                      checked={formik.values.hotTub}
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
                      checked={formik.values.pool}
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
                      checked={formik.values.indoorFireplace}
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
                      checked={formik.values.dryer}
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
                      checked={formik.values.gym}
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
                      checked={formik.values.kitchen}
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
                      checked={formik.values.wifi}
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
                      checked={formik.values.heating}
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
                      checked={formik.values.cableTV}
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
                Cập nhật
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditRoom;
