import "./Login.css";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { loginAction } from "../../redux/Actions/ManagerUsersAction";

const Login = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống!")
        .email("Vui lòng nhập đúng định dạng email"),
      password: Yup.string()
        .required("Mật khẩu không được bỏ trống !")
        .min(6, "Mật khẩu từ 6 đến 32 ký tự")
        .max(32, "Mật khẩu từ 6 đến 32 ký tự"),
    }),
    onSubmit: (values) => {
      dispatch(loginAction(values));
    },
  });
  return (
    <div className="login">
      <div className="login-overlay"></div>
      <div className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Chào mừng bạn đăng nhập</h2>
                    <p>Bạn không có tài khoản?</p>
                    <Link
                      to="/register"
                      className="btn btn-white btn-outline-white"
                    >
                      Đăng Ký
                    </Link>
                  </div>
                </div>
                <div className="login-wrap p-4 p-lg-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Đăng Nhập</h3>
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
                  <form className="signin-form" onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tài khoản"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.errors.email && formik.touched.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
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
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary submit px-3"
                        disabled={!formik.isValid}
                      >
                        Đăng Nhập
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">
                          Ghi nhớ tài khoản
                          <input type="checkbox" defaultChecked />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#">Quên mật khẩu</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
