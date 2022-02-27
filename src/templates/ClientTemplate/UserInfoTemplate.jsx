import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

export default function UserInfoTemplate(props) {
  let [widthHeight, setWidthHeight] = useState({
    width: window.innerWidth,
    height: window.height,
  });

  useEffect(() => {
    window.onresize = () => {
      setWidthHeight({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // console.log("onresize widthHeight.width:", widthHeight.width);
    };

    window.onload = () => {
      setWidthHeight({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    return () => {
      window.removeEventListener("onresize");
      window.removeEventListener("onload");
    };
  }, []);

  let { Component, path } = props;
  const renderComponent = (propsRoute) => {
    if (widthHeight.width <= 415 && props.MobileComponent) {
      return <props.MobileComponent {...propsRoute} />;
    } else {
      return <Component {...propsRoute} />;
    }
  };

  return (
    <Route
      exact
      path={path}
      render={(propsRoute) => {
        return <div>{renderComponent(propsRoute)}</div>;
      }}
    />
  );
}
