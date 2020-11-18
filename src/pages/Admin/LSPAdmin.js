import React, { useEffect } from "react";

import { connect } from "react-redux";
import {
  getAllAnswer,
  uploadFileQuestion,
} from "../../redux/actions/action_admin";
import { clearMessage } from "../../redux/actions/action_ui";
import { getUserData } from "../../redux/actions/action_user";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GetAllAnswer from "../../components/Admin/GetAllAnswer";
import Alert from "@material-ui/lab/Alert";

const CourseAdmin = (props) => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "LSP";
    props.getAllAnswer();
  }, []);

  const { loading } = props.ui;
  const { all_answer } = props.admin;

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const extension = file.name.slice(
      ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
    );
    if (extension === "pdf") {
      if (file.size > 20000000) {
        alert("File terlalu besar");
      } else {
        if (
          window.confirm(
            `Apakah anda yakin untuk upload question? File ${file.name}`
          )
        ) {
          const formData = new FormData();
          formData.append("file", file, file.name);
          props.uploadFileQuestion(formData);
        }
      }
    } else {
      alert("Hanya menerima pdf");
    }
  };

  const handleEditFile = () => {
    const input = document.getElementById("inputFile");
    input.click();
  };

  return (
    <React.Fragment>
      <div style={{ marginBottom: "1rem" }}>
        {props.ui.flash !== "" && props.ui.status === "admin-lsp" && (
          <Alert
            severity="success"
            onClose={() => props.clearMessage()}
            variant="outlined"
          >{`${props.ui.flash}`}</Alert>
        )}
      </div>
      <h1 style={{ color: "var(--mainColor)", marginBottom: "1rem" }}>
        Lembaga Sertifikasi Profesi
      </h1>
      <div className={classes.root}>
        <div style={{ width: "100%", marginBottom: "1rem" }}>
          {props.ui.loading ? (
            <p>.....</p>
          ) : (
            <div>
              <button
                className={classes.button}
                onClick={() => handleEditFile()}
              >
                Upload Question
              </button>
            </div>
          )}
          <input
            type="file"
            id="inputFile"
            hidden="hidden"
            onChange={(e) => handleChangeFile(e)}
          />
        </div>
        <div className={classes.tableLsp}>
          {loading ? (
            <p>.....</p>
          ) : (
            <div>
              <h2
                style={{ margin: "1rem 0 12px 0", color: "var(--mainColor)" }}
              >
                Submitted Answer
              </h2>
              <div className={classes.table}>
                <h3>Nama</h3>
                <h3>Action</h3>
              </div>
              <div style={{ maxHeight: "350px", overflow: "auto" }}>
                {all_answer.map((id) => {
                  return <GetAllAnswer key={id} userId={id} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
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
  button: {
    background: "var(--mainColor)",
    border: "transparent",
    padding: "10px",
    marginRight: "10px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    outline: "none",
  },
  table: {
    display: "flex",
    textAlign: "center",
    padding: "1.2rem 0",
    background: "white",
    color: "var(--mainColor)",
    border: "1px solid var(--mainColor)",
    "& h3:nth-child(1)": {
      flex: 1,
    },
    "& h3:nth-child(2)": {
      flex: 1,
    },
  },
});

export default connect(mapStateToProps, {
  getAllAnswer,
  getUserData,
  uploadFileQuestion,
  clearMessage,
})(CourseAdmin);
