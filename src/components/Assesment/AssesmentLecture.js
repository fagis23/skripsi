import React, { useState } from "react";

import axios from "../../config/axios";
import { connect } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";

const AssignmentComponent = (props) => {
  const { id, courseName } = props.data.course;
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState("");
  const [course, setCourse] = useState("");

  const handleUploadFile = () => {
    const input = document.getElementById("inputFile");
    input.click();
  };

  const handleChangeFiles = (e) => {
    const file = e.target.files[0];

    console.log(id);

    // let extension;
    // if (file === "") {
    //   alert("Harap pilih file untuk upload");
    // } else {
    //   extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
    //   if (extension === "pdf") {
    //     if (file.size > 20000000) {
    //       alert("File terlalu besar");
    //     } else {
    //       setFile(file);
    //     }
    //   } else {
    //     alert(
    //       "Hanya bisa mengupload file pdf , harap mengubah file kedalam bentuk pdf terlebih dahulu terimakasih"
    //     );
    //   }
    // }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h4>{id}</h4>
      <h4>{courseName}</h4>
      <h5 onClick={handleUploadFile}>
        {upload ? "Uploading..." : "Upload Soal"}
      </h5>
      <input
        type="file"
        id="inputFile"
        hidden="hidden"
        onChange={handleChangeFiles}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: "100%",
    justifyItems: "center",
    background: "white",
    color: "var(--mainColor)",
    padding: "15px 0",
  },
});

export default connect(mapStateToProps)(AssignmentComponent);
