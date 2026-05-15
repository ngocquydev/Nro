import React from "react";
import { Layout } from "antd";
const { Header } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 100,
  lineHeight: "100px",
  padding: 0,
  backgroundColor: "#4096ff",
};
function HeaderLayout() {
  return (
    <div>
      <Header style={headerStyle}>Header</Header>
    </div>
  );
}

export default HeaderLayout;
