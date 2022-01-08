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
  const [srcImage, setSrcImage] = useState(null);
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

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    console.log("file", file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("image", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        setSrcImage(e.target.result);
      };
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: locationData.name,
      province: locationData.province,
      country: locationData.country,
      valueate: locationData.valueate,
      image: locationData.image,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên không được bõ trống"),
      province: Yup.string().required("Tỉnh không được bõ trống"),
      country: Yup.string().required("Quốc gia không được bõ trống"),
    }),
    onSubmit: async (values) => {
      let formData = new FormData();
      // if (values.image !== null) {
      //   formData.append("File", values.image, values.image?.name);
      // }
      // dispatch(updateLocationByIdAction(id, values));
      // dispatch(updateLocationAvatar(id, formData));
      console.log("values", values);
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
        <Form.Item label="Hình ảnh">
          {formik.values.image ? (
            <Image width={200} src={formik.values.image} />
          ) : (
            <Image
              width={200}
              height={200}
              src="error"
              fallback="data:image/png;base64,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"
            />
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6,
          }}
        >
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
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
