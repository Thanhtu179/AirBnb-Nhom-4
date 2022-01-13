import React, { useState } from "react";
import { Form, Input, Button, Rate, Image } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addLocationAction } from "../../../redux/Actions/ManagerLocationAction";

const AddLocation = () => {
  const [srcImage, setSrcImage] = useState(null);
  const [rate, setRate] = useState(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const dispatch = useDispatch();

  const handleChangeRate = (name) => {
    return (value) => {
      formik.setFieldValue(name, value * 2);
      setRate(value);
    };
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      province: "",
      country: "",
      valueate: 0,
      image: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên không được bõ trống"),
      province: Yup.string().required("Tỉnh không được bõ trống"),
      country: Yup.string().required("Quốc gia không được bõ trống"),
    }),
    onSubmit: async (values) => {
      // console.log("values", values);
      dispatch(addLocationAction(values));
    },
  });

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
        <Form.Item label="Tên vị trí">
          <Input
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <span>
            <Rate
              allowHalf
              tooltips={desc}
              value={rate}
              onChange={handleChangeRate("valueate")}
            />
            {rate ? (
              <span className="ant-rate-text">{desc[rate - 1]}</span>
            ) : (
              ""
            )}
          </span>
        </Form.Item>
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-center">
            <Button size="large" htmlType="submit" type="primary" ghost>
              Thêm vị trí
            </Button>
            <Button size="large" htmlType="reset" danger className="ml-3">
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddLocation;
