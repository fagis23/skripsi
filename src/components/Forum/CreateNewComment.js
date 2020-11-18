import React, { useState } from "react";

import { connect } from "react-redux";
import { craeteNewComment as newComment } from "../../redux/actions/action_data";
import { clearError } from "../../redux/actions/action_ui";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

const CreateNewComment = (props) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");

  let error = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("userId", props.user.credentials.id);
    formData.append("postId", props.postId);
    formData.append("comment", comment);

    if (file === "") {
      props.newComment(formData, props.onClose);
    } else {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        if (file.size > 1000000) {
          alert("Image terlalu besar, maksimal 1MB");
        } else {
          formData.append("file", file, file.name);
          props.newComment(formData, props.onClose);
        }
      } else {
        alert("Hanya menerima gambar");
      }
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.comment = "";
    }
  };

  if (props.ui.error !== "") {
    error = { ...props.ui.error };
  }

  const handleClose = () => {
    props.onClose();
    props.clearError();
  };
  const handleChangeFile = (e) => {
    if (e.target.files.length === 0) {
      setFile("");
    } else {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.closeIcon} onClick={() => handleClose()}>
          <CloseIcon style={{ fontSize: 30 }} />
        </div>
        <div className={classes.header}>
          <Typography variant="h4">Add Comment</Typography>
        </div>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="outlined-basic-description"
            label="Comment"
            variant="outlined"
            className="comment"
            value={comment}
            onChange={(e) => handleChangeComment(e)}
            error={error.comment ? true : false}
            helperText={error.comment}
            multiline
          />
          <div className={classes.inputFile}>
            <Typography variant="subtitle1">Choose Image</Typography>
            <Input className="file" type="file" onChange={handleChangeFile} />
          </div>
          {props.ui.loading ? (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <CircularProgress style={{ color: "var(--mainColor)" }} />
            </div>
          ) : (
            <input type="submit" value="Add Comment" className="button" />
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const useStyles = makeStyles({
  root: {
    position: "relative",
    padding: "1rem",
    width: "500px",
  },
  container: {
    width: "100%",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    marginRight: "1rem",
    top: 10,
    color: "var(--mainColor)",
    cursor: "pointer",
  },
  header: {
    color: "var(--mainColor)",
    marginBottom: "1.5rem",
    marginTop: "10px",
  },
  form: {
    "& .comment": {
      width: "100%",
      margin: "1rem 0",
    },
    "& .file": {
      padding: "10px 0",
      marginLeft: "10px",
    },
    "& .button": {
      background: "var(--mainColor)",
      border: "1px solid var(--mainColor)",
      padding: "12px 10px",
      width: "100%",
      borderRadius: "4px",
      color: "white",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        background: "var(--darkColor)",
        border: "1px solid var(--darkColor)",
      },
    },
  },
  inputFile: {
    marginBottom: "1rem",
    display: "grid",
    gridTemplateColumns: "0.3fr 1fr",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, { newComment, clearError })(
  CreateNewComment
);
