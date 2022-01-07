import React from "react";
import "./UserInfo.css";

const UserInfo = (props) => {
  return <div>User Info id {props.match.params.id}</div>;
};

export default UserInfo;
