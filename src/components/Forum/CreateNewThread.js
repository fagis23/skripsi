import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import {
  createNewThread as newThread,
  getMyCourse,
} from "../../redux/actions/action_data";
import { clearError } from "../../redux/actions/action_ui";

import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const CreateNewThread = (props) => {
  const classes = useStyles();
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [course, setCourse] = useState("");

  let error = {};

  const { my_course } = props.data;

  useEffect(() => {
    props.getMyCourse(props.user.credentials.id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("userId", props.user.credentials.id);
    formData.append("topic", topic);
    formData.append("courseId", course);
    formData.append("question", question);
    formData.append("description", description);

    if (file === "") {
      props.newThread(formData, props.onClose);
    } else {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        if (file.size > 1000000) {
          alert("Image terlalu besar, maksimal 1MB");
        } else {
          formData.append("file", file, file.name);
          props.newThread(formData, props.onClose);
        }
      } else {
        alert("Hanya menerima gambar");
      }
    }
  };

  const handleChangeTopic = (e) => {
    setTopic(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.topic = "";
    }
  };
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.question = "";
    }
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.description = "";
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
    setFile(e.target.files[0]);
  };

  const handleChangeCourse = (e) => {
    setCourse(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.closeIcon} onClick={() => handleClose()}>
        <CloseIcon style={{ fontSize: 30 }} />
      </div>
      <div className={classes.header}>
        <Typography variant="h4">Create Thread</Typography>
      </div>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="standard-select-currency"
          select
          label="Select Course"
          value={course}
          onChange={handleChangeCourse}
          style={{ width: "100%", margin: "4px 0 1.2rem 0" }}
          variant="outlined"
        >
          {my_course.map((option) => (
            <MenuItem key={option.course.id} value={option.course.id}>
              {option.course.courseName} - {option.course.id}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic-topic"
          label="Topic"
          variant="outlined"
          className="topic"
          value={topic}
          onChange={(e) => handleChangeTopic(e)}
          error={error.topic ? true : false}
          helperText={error.topic}
        />
        <TextField
          id="outlined-basic-question"
          label="Question"
          variant="outlined"
          className="question"
          value={question}
          onChange={(e) => handleChangeQuestion(e)}
          error={error.question ? true : false}
          helperText={error.question}
        />
        <TextField
          id="outlined-basic-description"
          label="Description"
          variant="outlined"
          className="description"
          value={description}
          onChange={(e) => handleChangeDescription(e)}
          error={error.description ? true : false}
          helperText={error.description}
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
          <input type="submit" value="Add Thread" className="button" />
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  ui: state.ui,
});

const useStyles = makeStyles({
  root: {
    position: "relative",
    padding: "1rem",
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
    "& .topic": {
      width: "100%",
    },
    "& .question": {
      width: "100%",
      margin: "1.2rem 0",
    },
    "& .description": {
      width: "100%",
      marginBottom: "1rem",
    },
    "& .file": {
      padding: "10px 0",
      marginLeft: "10px",
    },
    "& .button": {
      background: "var(--mainColor)",
      border: "1px solid var(--mainColor)",
      padding: "10px",
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

export default connect(mapStateToProps, { newThread, clearError, getMyCourse })(
  CreateNewThread
);
