import React, { useState } from "react";

import { connect } from "react-redux";
import { addMaterialsAdmin } from "../../redux/actions/action_admin";
import { clearError } from "../../redux/actions/action_ui";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const AddMaterial = (props) => {
  const classes = useStyles();

  const [materialName, setMaterialName] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [materialLevel, setMaterialLevel] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  let error = {};

  const { loading } = props.ui;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      courseId: props.id_course,
      materialName,
      materialLevel,
      materialType,
      materialDescription,
    };
    props.addMaterialsAdmin(data, props.onClose);
  };

  const handleChangeMN = (e) => {
    setMaterialName(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.materialName = "";
    }
  };
  const handleChangeMT = (e) => {
    setMaterialType(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.materialType = "";
    }
  };
  const handleChangeML = (e) => {
    setMaterialLevel(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.materialLevel = "";
    }
  };
  const handleChangeMD = (e) => {
    setMaterialDescription(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.materialDescription = "";
    }
  };

  if (props.ui.error !== "") {
    error = { ...props.ui.error };
  }

  const handleClose = () => {
    props.onClose();
    props.clearError();
  };

  return (
    <div className={classes.root}>
      <div className={classes.closeIcon} onClick={() => handleClose()}>
        <CloseIcon style={{ fontSize: 30 }} />
      </div>
      <div className={classes.header}>
        <Typography variant="h4">Add Material</Typography>
      </div>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="outlined-basic-desc"
          label="Material Description"
          variant="outlined"
          className="topic"
          value={materialDescription}
          onChange={(e) => handleChangeMD(e)}
          error={error.materialDescription ? true : false}
          helperText={error.materialDescription}
        />
        <TextField
          id="outlined-basic-name"
          label="Material Name"
          variant="outlined"
          className="question"
          value={materialName}
          onChange={(e) => handleChangeMN(e)}
          error={error.materialName ? true : false}
          helperText={error.materialName}
        />
        <FormControl component="fieldset" style={{ marginBottom: "10px" }}>
          <FormLabel component="legend" style={{ marginBottom: "10px" }}>
            Material Type
          </FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue=""
            onChange={(e) => handleChangeMT(e)}
          >
            <FormControlLabel
              value="MATERIAL"
              control={<Radio color="primary" />}
              label="Material"
              labelPlacement="top"
            />
            <FormControlLabel
              value="QUIZ"
              control={<Radio color="primary" />}
              label="Quiz"
              labelPlacement="top"
            />
          </RadioGroup>
          {error.materialType && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error.materialType}
            </p>
          )}
        </FormControl>
        <TextField
          id="outlined-basic-level"
          label="Material Level"
          variant="outlined"
          className="material"
          value={materialLevel}
          onChange={(e) => handleChangeML(e)}
          error={error.materialLevel ? true : false}
          helperText={error.materialLevel}
        />
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <CircularProgress style={{ color: "var(--mainColor)" }} />
          </div>
        ) : (
          <input type="submit" value="Add Material" className="button" />
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
  admin: state.admin,
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
    "& .material": {
      width: "100%",
      marginBottom: "1rem",
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
});

export default connect(mapStateToProps, { addMaterialsAdmin, clearError })(
  AddMaterial
);
