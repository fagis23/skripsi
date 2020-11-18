import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import axios from "../../../config/axios";

import Paper from "@material-ui/core/Paper";

const CardCourse = (props) => {
  const classes = useStyles();
  const {
    materialLevel,
    materialDescription,
    materialName,
    materialId,
    courseId,
  } = props.data;
  const [loading, setLoading] = useState(false);

  const [materialOnHover, setMaterialOnHover] = useState(false);

  const downloadMateri = (id) => {
    setLoading(true);
    const url = `https://iati-service.azurewebsites.net/upload-file/getMaterial/${id}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.target = "_blank";
    downloadLink.click();
    setLoading(false);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Typography variant="subtitle1">
          Material {`${materialLevel}`}
        </Typography>
      </div>
      <div
        className={classes.main}
        onMouseEnter={() => setMaterialOnHover(true)}
        onMouseLeave={() => setMaterialOnHover(false)}
      >
        <div>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Topic
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2">{materialName}</Typography>
        </div>
        {materialOnHover && (
          <>
            <div style={{ margin: "10px 0" }}>
              <Typography variant="subtitle2">{materialDescription}</Typography>
            </div>
            <div className={classes.download}>
              <small onClick={() => downloadMateri(materialId)}>
                {loading ? "Downloading..." : "Download material"}
              </small>
            </div>
          </>
        )}
      </div>
    </Paper>
  );
};

const useStyles = makeStyles({
  paper: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "0.2fr 1fr",
    border: "1px solid rgb(225,225,225)",
  },
  header: {
    background: "rgb(245,245,245)",
    color: "black",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid rgb(225,225,225) ",
  },
  main: {
    padding: "10px 1em",
    background: "rgb(235,235,235)",
    textAlign: "justify",
    color: "var(--mainColor)",
    cursor: "pointer",
  },
  download: {
    margin: "6px 0",
    "& small": {
      color: "var(--mainColor)",
      textDecoration: "underline",
      cursor: "pointer",
      "&:hover": {
        color: "red",
      },
    },
  },
});

export default CardCourse;
