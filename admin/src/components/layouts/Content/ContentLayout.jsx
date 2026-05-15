import React from "react";
import { Layout } from "antd";
const { Content } = Layout;
const contentStyle = {
  textAlign: "center",
  minHeight: "100vh",
  color: "#fff",
  backgroundColor: "#0958d9",
};
function ContentLayout() {
  return (
    <div>
      <Content style={contentStyle}>Content</Content>
    </div>
  );
}

export default ContentLayout;
