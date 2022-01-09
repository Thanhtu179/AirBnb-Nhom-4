import React from "react";
import { Route } from "react-router-dom";
import Home from "../../pages/Home/Home";

export const ClientTemplate = (props) => {
  const { Component, path } = props;

  return (
    <Route
      exact
      path={path}
      render={(propsRoute) => {
        return;
        <Home {...propsRoute} />;
      }}
    />
  );
};
