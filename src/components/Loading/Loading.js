import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        style={{ color: "var(--mainColor)", width: "80px", height: "80px" }}
      />
    </div>
  );
};

export default Loading;
