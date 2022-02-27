import React from "react";
import PropTypes from "prop-types";
import { Drawer, Button, Space } from "antd";

const DrawerModel = (props) => {
  let { title, Component, visible, onClose, width } = props;
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      width={width == undefined ? 736 : width}
      visible={visible}
    >
      {Component}
    </Drawer>
  );
};

DrawerModel.propTypes = {
  title: PropTypes.string.isRequired,
  Component: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default DrawerModel;
