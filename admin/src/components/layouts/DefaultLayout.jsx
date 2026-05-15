import React from "react";
import { Layout } from "antd";
import HeaderLayout from "./Header/HeaderLayout";
import ContentLayout from "./Content/ContentLayout";
import SideBar from "./SideBar/SideBar";
const layoutStyle = {
  overflow: "hidden",
};

function DefaultLayout({ children }) {
  return (
    <div>
      <Layout style={layoutStyle}>
        <SideBar />
        <Layout>
          <HeaderLayout />
          <ContentLayout />
        </Layout>
      </Layout>
    </div>
  );
}

export default DefaultLayout;
