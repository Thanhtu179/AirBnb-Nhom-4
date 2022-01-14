import "./Register.css";

import React, { useEffect } from "react";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllUser,
  registerAction,
} from "../../redux/Actions/ManagerUsersAction";
import { useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const { arrUsers } = useSelector((state) => state.ManagerUsersReducer);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      birthday: "",
      gender: true,
      address: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên không được bỏ trống"),
      email: Yup.string()
        .required("Email không được bỏ trống!")
        .email("Vui lòng nhập đúng định dạng email"),
      password: Yup.string()
        .required("Mật khẩu không được bỏ trống !")
        .min(6, "Mật khẩu từ 6 đến 32 ký tự")
        .max(32, "Mật khẩu từ 6 đến 32 ký tự"),
      rePassword: Yup.string()
        .required("Mật khẩu không được bỏ trống !")
        .min(6, "Mật khẩu từ 6 đến 32 ký tự")
        .max(32, "Mật khẩu từ 6 đến 32 ký tự")
        .oneOf([Yup.ref("password")], "Mật khẩu nhập lại không đúng"),
      phone: Yup.string().required("Không được bỏ trống"),
      birthday: Yup.string().required("Không được bỏ trống"),
      address: Yup.string().required("Không được bỏ trống"),
    }),

    onSubmit: (values) => {
      let index = arrUsers.findIndex((user) => user.email === values.email);
      if (index != -1) {
        formik.setFieldError("email", "Email đã được đăng ký");
      } else {
        dispatch(registerAction(values));
      }
      // console.log("object", values);
    },
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <div className="register">
      <div className="register-overlay"></div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Chào mừng bạn đăng ký</h2>
                    <p>Bạn đã có tài khoản?</p>
                    <Link
                      to="/login"
                      className="btn btn-white btn-outline-white"
                    >
                      Đăng Nhập
                    </Link>
                  </div>
                </div>
                <div className="login-wrap p-3 p-lg-4">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Đăng Ký</h3>
                    </div>
                    <div className="w-100">
                      <p className="social-media d-flex justify-content-end">
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="fab fa-facebook-f" />
                        </a>
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="fab fa-twitter" />
                        </a>
                      </p>
                    </div>
                  </div>
                  <form
                    className="register-form"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="form-group d-flex">
                      <div className="w-50 text-left mr-3">
                        <label className="label" htmlFor="name">
                          Tên
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tên người dùng"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name ? (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-50 text-md-left">
                        <label className="label" htmlFor="phone">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Số điện thoại"
                          name="phone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                          <div className="text-danger">
                            {formik.errors.phone}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Tài khoản"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <div className="text-danger">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="rePassword">
                        Nhập lại mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu"
                        name="rePassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.rePassword && formik.touched.rePassword ? (
                        <div className="text-danger">
                          {formik.errors.rePassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group d-flex">
                      <div className="w-50 text-left mr-3">
                        <label className="label" htmlFor="birthday">
                          Ngày sinh
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="birthday"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.birthday && formik.touched.birthday ? (
                          <div className="text-danger">
                            {formik.errors.birthday}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-50 text-md-left">
                        <label className="label" htmlFor="birthday">
                          Giới tính
                        </label>
                        <select
                          className="form-control"
                          name="gender"
                          onChange={(e) => {
                            formik.setFieldValue("gender", e.target.value);
                          }}
                        >
                          <option value={true}>Nam</option>
                          <option value={false}>Nữ</option>
                        </select>
                        {formik.errors.gender && formik.touched.gender ? (
                          <div className="text-danger">
                            {formik.errors.gender}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="label" htmlFor="address">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Địa chỉ"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.address && formik.touched.address ? (
                        <div className="text-danger">
                          {formik.errors.address}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary submit px-3"
                      >
                        Đăng Ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
