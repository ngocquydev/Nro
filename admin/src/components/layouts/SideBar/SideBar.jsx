import React from "react";
import { Layout } from "antd";
const { Sider } = Layout;
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};
function SideBar() {
  return (
    <Sider width="20%" style={siderStyle}>
      Sider
    </Sider>
  );
}

export default SideBar;
