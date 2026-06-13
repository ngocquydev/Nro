import React from "react";
import { ClipLoader } from "react-spinners";

function LoadingCommon({ loading }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        width: "100%",
      }}
    >
      <ClipLoader
        color="#36d7b7"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
}

export default LoadingCommon;
