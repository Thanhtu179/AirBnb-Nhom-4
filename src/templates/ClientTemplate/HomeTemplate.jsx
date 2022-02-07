import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
  const [widthHeight, setWidthHeight] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setWidthHeight({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.onload = () => {
      setWidthHeight({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    return () => {
      window.removeEventListener("onresize", this.onresize);
      window.removeEventListener("onreload", this.onreload);
    };
  }, []);

  const { Component, path } = props;

  const renderComponent = (propsRoute) => {
    if (widthHeight.width < 765 && props.MobileComponent) {
      return <props.MobileComponent {...propsRoute} />;
    }
    return <Component {...propsRoute} />;
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
};
