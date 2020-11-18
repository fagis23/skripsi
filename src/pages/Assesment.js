import React, { useState, useEffect } from "react";

import {
  getAvalaibleCourse,
  uploadFileTest,
  getMyCourse,
  uploadSoalLecture,
} from "../redux/actions/action_data";
import { clearMessage } from "../redux/actions/action_ui";
import { connect } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import axios from "../config/axios";
import Alert from "@material-ui/lab/Alert";

const Assesment = (props) => {
  const [openButton, setOpenButton] = useState(false);
  const { id, role } = props.user.credentials;
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const { my_course, loading_my_course, status_upload } = props.data;
  const [file, setFile] = useState("");
  const classes = useStyles();
  const [loadingLecture, setloadingLecture] = useState(false);

  const tutorials = [
    `Anda bisa mengikuti test assesment dengan cara menekan tombol "Take Test" dibawah`,
    `Jika anda belum mengambil course sama sekali anda tidak dapat mengikuti test assesment`,
    `Setelah anda menekan tombol "Take Test", anda dapat mendownload soal test dengan menekan tombol "Download Case"`,
    `Mohon untuk mengubah file menjadi .pdf pada saat mengupload jawaban`,
    `File max jawaban yang bisa diupload adalah 20MB`,
  ];

  useEffect(() => {
    document.title = "Assesment";
    props.getAvalaibleCourse(id);
    props.getMyCourse(id);
  }, []);

  useEffect(() => {
    if (my_course.length === 0) {
      props.getMyCourse(id);
    }
  }, []);

  const handleTest = () => {
    if (course === "") {
      setLoading(true);
      setOpenButton(true);
      axios
        .get(`/iati/upload-file/getQuestion/${my_course[0].course.id}`)
        .then((res) => {
          if (res.data === "") {
            setLoading(false);
            setOpenButton(false);
            alert("Data tidak ditemuan");
          } else {
            setFile(res.data);
            setLoading(false);
            setOpenButton(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(true);
      setOpenButton(true);
      axios
        .get(`/iati/upload-file/getQuestion/${course}`)
        .then((res) => {
          if (res.data === "") {
            setLoading(false);
            setOpenButton(false);
            alert("Data tidak ditemuan");
          } else {
            setFile(res.data);
            setLoading(false);
            setOpenButton(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    let extension;
    if (file === "" || file === undefined) {
      return alert("File tidak boleh kosong");
    } else {
      extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
    }

    if (extension === "pdf") {
      if (file.size > 20000000) {
        alert("File terlalu besar");
      } else {
        const data = {
          courseId: course,
          userId: id,
        };
        const formData = new FormData();
        formData.append("file", file, file.name);
        props.uploadFileTest(formData, data);
      }
    } else {
      alert("Hanya menerima file .pdf");
    }
  };

  const handleUploadFile = () => {
    const input = document.getElementById("inputFile");
    if (course === "") {
      alert("Harap memilih course terlebih dahulu");
    } else {
      input.click();
    }
  };

  const handleChangeCourse = (e) => {
    const courseId = e.target.value;
    setCourse(courseId);
    setOpenButton(false);
  };

  const downloadFile = (data) => {
    const linkSource = `data:application/pdf;base64,${data}`;
    const downloadLink = document.createElement("a");
    const fileName = `Test-Iati.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleClickLecture = (courseId) => {
    setCourse(courseId);
    const input = document.getElementById("inputFile");
    if (loadingLecture) {
      alert("File sedang diupload, harap menunggu...");
    } else if (status_upload === "PENDING") {
      alert("File masih dalam proses upload");
    } else {
      input.click();
    }
  };
  const handleChangeFilesLecture = (e) => {
    const file = e.target.files[0];
    let extension;
    if (file === "") {
      alert("Harap pilih file untuk upload");
    } else {
      extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
      if (extension === "pdf") {
        if (file.size > 20000000) {
          alert("File terlalu besar");
        } else {
          const formData = new FormData();
          setloadingLecture(true);
          formData.append("file", file, file.name);
          props.uploadSoalLecture(formData, course);
        }
      } else {
        alert(
          "Hanya bisa mengupload file pdf , harap mengubah file kedalam bentuk pdf terlebih dahulu terimakasih"
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.header}>
          <h1>Assesment</h1>
        </div>
        {props.ui.flash !== "" && props.ui.status === "assesment" && (
          <Alert
            style={{ margin: "1rem 0" }}
            severity="success"
            onClick={() => props.clearMessage()}
          >
            {props.ui.flash}
          </Alert>
        )}
        <div>
          {role !== "Lecturer" && (
            <div style={{ marginTop: "1.5rem" }}>
              <TextField
                id="standard-select-currency"
                select
                value={course}
                onChange={handleChangeCourse}
                style={{ width: "100%", margin: "1.5rem 0" }}
                variant="outlined"
                helperText="Pilih course"
                SelectProps={{
                  native: true,
                }}
              >
                {my_course.map((option) => (
                  <option key={option.course.id} value={option.course.id}>
                    {option.course.courseName} - {option.course.id}
                  </option>
                ))}
              </TextField>
              <h3 style={{ textTransform: "bold", marginBottom: "10px" }}>
                Step to take test
              </h3>
              {tutorials.map((tutorial, index) => {
                return (
                  <div className={classes.tutorial} key={index}>
                    <div>
                      <h4>{index + 1}.</h4>
                    </div>
                    <div>{tutorial}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div className={classes.containerButton}>
            {role === "Lecturer" ? (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    width: "100%",
                    justifyItems: "center",
                    background: "var(--mainColor)",
                    color: "white",
                    padding: "15px 0",
                    borderRadius: "4px 4px 0 0",
                  }}
                >
                  <h4>Course Id</h4>
                  <h4>Course Name</h4>
                  <h4>Action</h4>
                </div>
                {loading_my_course ? (
                  <p>Loading...</p>
                ) : (
                  my_course.map((course) => {
                    return (
                      <div
                        key={course.course.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          width: "100%",
                          justifyItems: "center",
                          background: "white",
                          color: "var(--mainColor)",
                          padding: "15px 0",
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <h4>{course.course.id}</h4>
                        <h4>{course.course.courseName}</h4>

                        <button
                          style={{ width: "30%" }}
                          onClick={() => handleClickLecture(course.course.id)}
                          className={classes.button}
                        >
                          Upload Soal
                        </button>
                        <input
                          type="file"
                          id="inputFile"
                          hidden="hidden"
                          onChange={(e) => handleChangeFilesLecture(e)}
                        />
                      </div>
                    );
                  })
                )}
                <div style={{ marginTop: "16px" }}>
                  {status_upload === "PENDING" && <p>Uploading file...</p>}
                </div>
              </div>
            ) : openButton ? null : (
              <button className={classes.button} onClick={handleTest}>
                Take test
              </button>
            )}
            <div className={classes.actionButton}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                openButton &&
                file !== "" && (
                  <div>
                    <div style={{ display: "flex", marginRight: "20px" }}>
                      <button
                        className={classes.buttonDownload}
                        onClick={() => downloadFile(file)}
                      >
                        Download Soal
                      </button>
                      {openButton && file !== "" && (
                        <div>
                          <button
                            className={classes.buttonDownload}
                            onClick={handleUploadFile}
                          >
                            Upload Jawaban
                          </button>
                          <input
                            type="file"
                            id="inputFile"
                            hidden="hidden"
                            onChange={(e) => handleChangeFile(e)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  ui: state.ui,
});

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    minHeight: "100%",
    textAlign: "justify",
    padding: "0 7rem",
    position: "relative",
    marginBottom: "2rem",
    bottom: 0,
  },
  header: {
    color: "var(--mainColor)",
    borderBottom: "1px solid var(--mainColor)",
  },
  tutorial: {
    display: "grid",
    gridTemplateColumns: "2rem 1fr",
    padding: "14px 0",
  },
  containerButton: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
  },
  button: {
    width: "20%",
    background: "var(--mainColor)",
    border: "1px solid var(--mainColor)",
    padding: "10px",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      background: "var(--darkColor)",
      border: "1px solid var(--darkColor)",
    },
  },

  buttonDownload: {
    background: "white",
    border: "1px solid var(--mainColor)",
    padding: "10px",
    borderRadius: "4px",
    color: "var(--mainColor)",
    cursor: "pointer",
    outline: "none",
    marginRight: "10px",
    "&:hover": {
      background: "var(--mainColor)",
      border: "1px solid var(--mainColor)",
      color: "white",
    },
  },
  paper: {
    padding: "2rem 1rem",
    width: "400px",
  },
  inputFile: {
    margin: "1rem 0",
    width: "100%",
    "& .file": {
      width: "100%",
      padding: "10px 0",
    },
  },
});

export default connect(mapStateToProps, {
  getAvalaibleCourse,
  uploadFileTest,
  getMyCourse,
  uploadSoalLecture,
  clearMessage,
})(Assesment);
