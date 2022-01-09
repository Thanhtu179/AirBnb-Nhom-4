import React from "react";
import { Route } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export const FooterTemplate = (props) => {
  let { Component, path } = props;
  return (
    <Route
      path={path}
      render={(propsRoute) => {
        return (
          <div>
            <Component {...propsRoute} />
            <Footer />
          </div>
        );
      }}
    />
  );
};
