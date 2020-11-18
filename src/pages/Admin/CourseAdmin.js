import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import AddMaterial from "../../components/Admin/AddMaterial";
import AddCourse from "../../components/Admin/AddCourse";
import {
  getCourseAdmin,
  getMaterialAdmin,
  uploadFileMaterial,
} from "../../redux/actions/action_admin";
import { clearMessage } from "../../redux/actions/action_ui";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";

const CourseAdmin = (props) => {
  const classes = useStyles();
  const [courseId, setCourseId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [openCourse, setOpenCourse] = useState(false);
  const [openMaterials, setOpenMaterials] = useState(false);
  const [materialHover, setMaterialHover] = useState(false);
  const [idMaterialHover, setIdMaterialHover] = useState("");

  useEffect(() => {
    document.title = "Course";
    props.getCourseAdmin();
  }, []);

  const {
    course_admin,
    material_admin,
    loading_course,
    loading_material,
  } = props.admin;

  const handleClickMateri = (id) => {
    props.getMaterialAdmin(id);
    setCourseId(id);
  };

  const handleChangeFile = (e) => {
    let extension;
    const file = e.target.files[0];
    if (file === undefined || file === "") {
      return alert("File tidak boleh kosong");
    } else {
      extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
    }
    setMaterialId(materialId);

    if (extension === "ppt" || extension === "pptx") {
      if (file.size > 20000000) {
        alert("File terlalu besar");
      } else {
        const formData = new FormData();
        formData.append("file", file, file.name);
        props.uploadFileMaterial(formData, materialId, courseId);
      }
    } else {
      alert("Hanya menerima power point");
    }
  };

  const handleEditFile = (id_material) => {
    const input = document.getElementById("inputFile");
    setMaterialId(id_material);
    input.click();
  };

  let addCourse = (
    <Dialog open={openCourse}>
      <AddCourse onClose={() => setOpenCourse(false)} />
    </Dialog>
  );
  let addMaterials = (
    <Dialog open={openMaterials}>
      <AddMaterial
        onClose={() => setOpenMaterials(false)}
        id_course={courseId}
      />
    </Dialog>
  );

  const handleOnHoverDetailMaterial = (id) => {
    setIdMaterialHover(id);
    setMaterialHover(true);
  };
  const handleOutHoverDetailMaterial = () => {
    setIdMaterialHover("");
    setMaterialHover(false);
  };

  return (
    <>
      {addCourse}
      {addMaterials}
      <div className={classes.root}>
        <div style={{ marginBottom: "1rem" }}>
          {props.ui.flash !== "" && props.ui.status === "admin" && (
            <Alert
              severity="success"
              onClose={() => props.clearMessage()}
              variant="outlined"
            >{`${props.ui.flash}`}</Alert>
          )}
        </div>
        <div>
          <h1 style={{ color: "var(--mainColor)", marginBottom: "1rem" }}>
            Course
          </h1>
          {loading_course ? (
            <p>.......</p>
          ) : (
            <div className={classes.courseContainer}>
              {course_admin.map((course, index) => {
                return (
                  <Paper
                    key={index}
                    className={classes.newPaper}
                    onClick={() => handleClickMateri(course.id)}
                  >
                    <div className={classes.card}>
                      <div className="nomor_courses">
                        <h4>{course.id}</h4>
                      </div>
                      <div className="desc_courses">
                        <h4>{course.courseName}</h4>
                      </div>
                    </div>
                  </Paper>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ margin: "1rem 0" }}>
          <h1 style={{ color: "var(--mainColor)", marginBottom: "1rem" }}>
            Materials
            {courseId !== "" && !loading_material && (
              <small>({courseId})</small>
            )}
          </h1>
          {material_admin.length === 0 ? (
            <p>Silahkan pilih course diatas</p>
          ) : loading_material ? (
            <p>.......</p>
          ) : (
            material_admin.materials !== undefined && (
              <div>
                <div className={classes.materialContainer}>
                  {material_admin.materials.length === 0 ? (
                    <p>
                      Material tidak di temukan, tambahkan pada add materials
                    </p>
                  ) : (
                    material_admin.materials
                      .sort((a, b) => a.materialLevel - b.materialLevel)
                      .map((material, index) => {
                        return (
                          <Paper key={index} className={classes.newPaper}>
                            <div className={classes.card}>
                              <div className="nomor_courses">
                                <h4 style={{ height: "100%" }}>{index + 1}</h4>
                              </div>
                              <div
                                className="desc_courses"
                                onMouseEnter={() =>
                                  handleOnHoverDetailMaterial(
                                    material.materialId
                                  )
                                }
                                onMouseLeave={() =>
                                  handleOutHoverDetailMaterial()
                                }
                              >
                                <h4>{material.materialName}</h4>
                                {materialHover &&
                                  idMaterialHover === material.materialId && (
                                    <div>
                                      <p>material Id : {material.materialId}</p>
                                      <p>
                                        material description :{" "}
                                        {material.materialDescription}
                                      </p>
                                      <p>
                                        material level :{" "}
                                        {material.materialLevel}
                                      </p>
                                      <p>
                                        material type : {material.materialType}
                                      </p>
                                    </div>
                                  )}
                              </div>
                              <div className={classes.upload}>
                                {materialId === material.materialId &&
                                props.ui.loading ? (
                                  <h4>Uploading file .....</h4>
                                ) : (
                                  <h4
                                    onClick={() =>
                                      handleEditFile(material.materialId)
                                    }
                                  >
                                    Upload File
                                  </h4>
                                )}
                              </div>
                            </div>
                            <input
                              type="file"
                              id="inputFile"
                              hidden="hidden"
                              onChange={(e) => handleChangeFile(e)}
                            />
                          </Paper>
                        );
                      })
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <div className={classes.action}>
          <button className="btn" onClick={() => setOpenCourse(true)}>
            Add Course
          </button>
          {material_admin.length !== 0 && (
            <button className="btn" onClick={() => setOpenMaterials(true)}>
              Add Materials
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
  admin: state.admin,
});

const useStyles = makeStyles({
  root: {
    minHeight: "350px",
    backgroundColor: "rgb(247, 247, 247)",
    padding: "0 7rem",
    "& ::-webkit-scrollbar": {
      width: "10px",
    },
    "& ::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "5px",
    },
    "& ::-webkit-scrollbar-thumb": {
      background: "var(--mainColor)",
      borderRadius: "5px",
    },
    "& ::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  courseContainer: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    paddingRight: "5px",
  },
  materialContainer: {
    width: "100%",
    maxHeight: "350px",
    overflow: "auto",
    paddingRight: "5px",
  },
  newPaper: {
    marginBottom: "5px",
    cursor: "pointer",
  },
  card: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background: "var(--darkColor)",
    "& .nomor_courses": {
      flex: 0.3,
      background: "var(--darkColor)",
      padding: "1.5rem 0",
      color: "white",
      height: "auto",
    },
    "& .desc_courses": {
      flex: 1,
      color: "white",
      background: "var(--mainColor)",
      padding: "1.5rem",
      height: "100%",
    },
  },
  action: {
    margin: "1rem 0",
    "& .btn": {
      background: "var(--mainColor)",
      border: "transparent",
      padding: "10px",
      marginRight: "10px",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      outline: "none",
    },
  },
  upload: {
    color: "white",
    padding: "1rem",
    flex: 0.4,
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export default connect(mapStateToProps, {
  getCourseAdmin,
  getMaterialAdmin,
  clearMessage,
  uploadFileMaterial,
})(CourseAdmin);
