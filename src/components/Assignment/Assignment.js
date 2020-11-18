import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../../config/axios";
import { connect } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";

const AssignmentComponent = (props) => {
  const { materialName } = props.data;
  const { id } = props.data.course;
  const [download, setDownload] = useState(false);
  const [upload, setUpload] = useState(false);

  const userId = props.user.credentials.id;
  const materialId = props.data.id;

  const handleDownload = () => {
    setDownload(true);
    axios
      .get(
        `/iati/upload-file/assignment/getAnswer?userId=${userId}&materialId=${materialId}`
      )
      .then((res) => {
        console.log(res.data);
        setDownload(false);
        const linkSource = `data:application/pdf;base64,${res.data}`;
        const downloadLink = document.createElement("a");
        const fileName = `Soal_${props.data.id}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
      .catch((err) => {
        setDownload(false);
        console.log(err);
      });
  };

  const handleUpload = (file) => {
    setUpload(true);
    axios
      .post(`/iati/upload-file/request/answer/quiz`, file)
      .then(() => {
        setUpload(false);
        alert("File berhasil di upload");
      })
      .catch((err) => {
        setUpload(false);
      });
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    let extension;
    if (file === "" || file === undefined) {
      return alert("File tidak boleh kosong");
    } else {
      extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
      if (extension === "pdf") {
        if (file.size > 20000000) {
          alert("File terlalu besar");
        } else {
          const formData = new FormData();
          formData.append("file", file, file.name);
          formData.append("userId", userId);
          formData.append("materialId", materialId);
          handleUpload(formData);
        }
      } else {
        alert(
          "Hanya bisa mengupload file pdf , harap mengubah file kedalam bentuk pdf terlebih dahulu terimakasih"
        );
      }
    }
  };

  const handleUploadFile = () => {
    const input = document.getElementById("inputFile");
    input.click();
  };

  const classes = useStyles();
  return (
    <>
      {props.data.length !== 0 ? (
        <div className={classes.root}>
          <div>
            <Link to={`/course/my_course/details?id=${id}`}>{id}</Link>
          </div>
          <div>
            <h4>{materialName}</h4>
          </div>
          <div className={classes.action}>
            <h5 onClick={handleDownload}>
              {download ? "Downloading..." : "Download Soal"}
            </h5>
            <h5 onClick={handleUploadFile}>
              {upload ? "Uploading..." : "Upload Jawaban"}
            </h5>
            <input
              type="file"
              id="inputFile"
              hidden="hidden"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
        </div>
      ) : (
        <div className={classes.emptyData}>
          <h5>{props.emptyTitle}</h5>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    padding: "12px 0",
    background: "rgb(245,245,245)",
    justifyItems: "center",
    border: "1px solid rgb(235,235,235)",
    "& a": {
      color: "var(--mainColor)",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "&:nth-child(odd)": {
      background: "rgb(235,235,235)",
    },
  },
  emptyData: {
    display: "grid",
    gridTemplateColumns: "1fr",
    padding: "1.5rem 0",
    background: "rgb(245,245,245)",
    justifyItems: "center",
  },
  action: {
    display: "flex",
    color: "var(--mainColor)",
    "& h5": {
      margin: "0 4px",
      cursor: "pointer",
      borderRadius: "4px",
      padding: "6px",
    },
    "& h5:nth-child(1)": {
      background: "var(--mainColor)",
      color: "white",
      border: "1px solid var(--mainColor)",
    },
    "& h5:nth-child(2)": {
      background: "white",
      color: "var(--mainColor)",
      border: "1px solid var(--mainColor)",
    },
  },
});

export default connect(mapStateToProps)(AssignmentComponent);
