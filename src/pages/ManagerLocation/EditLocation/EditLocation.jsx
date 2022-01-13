import React, { useEffect, useState } from "react";
import { Form, Input, Button, Rate, Image } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationByIdAction,
  updateLocationAvatar,
  updateLocationByIdAction,
} from "../../../redux/Actions/ManagerLocationAction";

const EditLocation = (props) => {
  let { id } = props;
  const [rate, setRate] = useState(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const dispatch = useDispatch();
  const { locationData } = useSelector((state) => state.ManagerLocationReducer);

  const handleChangeRate = (name) => {
    return (value) => {
      formik.setFieldValue(name, value * 2);
      setRate(value);
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: locationData.name,
      province: locationData.province,
      country: locationData.country,
      valueate: locationData.valueate,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên không được bõ trống"),
      province: Yup.string().required("Tỉnh không được bõ trống"),
      country: Yup.string().required("Quốc gia không được bõ trống"),
    }),
    onSubmit: async (values) => {
      // console.log("values", values);
      dispatch(updateLocationByIdAction(id, values));
    },
  });

  useEffect(() => {
    dispatch(getLocationByIdAction(id));
  }, []);

  return (
    <div className="container">
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        className="my-5"
        onFinish={formik.handleSubmit}
      >
        <h4 className="mb-5">
          <i className="fab fa-airbnb mr-2"></i>Thông tin vị trí
        </h4>
        {formik.errors.name && formik.touched.name ? (
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
            style={{ margin: 0 }}
          >
            <div className="text-danger">{formik.errors.name}</div>
          </Form.Item>
        ) : null}
        <Form.Item label="Tên Phòng">
          <Input
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </Form.Item>
        {formik.errors.province && formik.touched.province ? (
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
            style={{ margin: 0 }}
          >
            <div className="text-danger">{formik.errors.province}</div>
          </Form.Item>
        ) : null}
        <Form.Item label="Tỉnh">
          <Input
            name="province"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
          />
        </Form.Item>
        {formik.errors.country && formik.touched.country ? (
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
            style={{ margin: 0 }}
          >
            <div className="text-danger">{formik.errors.country}</div>
          </Form.Item>
        ) : null}
        <Form.Item label="Quốc gia">
          <Input
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <span>
            <Rate
              allowHalf
              tooltips={desc}
              value={formik.values.valueate / 2}
              onChange={handleChangeRate("valueate")}
            />
            {formik.values.valueate ? (
              <span className="ant-rate-text">
                {desc[formik.values.valueate / 2 - 1]}
              </span>
            ) : (
              ""
            )}
          </span>
        </Form.Item>
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-center">
            <Button size="large" htmlType="submit" type="primary" ghost>
              Cập nhật vị trí
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditLocation;
