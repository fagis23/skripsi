import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getSingleMyCourse } from "../redux/actions/action_data";

import SingleMyCourse from "../components/AllCourse/SingleMyCourse";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const PageSingleMyCourse = (props) => {
  const urlParams = new URLSearchParams(props.location.search);
  const id_course = urlParams.get("id");
  const classes = useStyles();

  useEffect(() => {
    props.getSingleMyCourse(id_course);
  }, [id_course]);

  const { loading_single_course } = props.data;

  return (
    <div className={classes.root}>
      {loading_single_course ? (
        <div
          style={{
            height: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress
            style={{ color: "var(--mainColor)", fontsize: "30px" }}
          />
        </div>
      ) : props.data.single_course === 400 ||
        props.data.single_course === 404 ? (
        <div
          style={{
            height: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            style={{ color: "var(--mainColor)", marginBottom: "10px" }}
          >
            404
          </Typography>
          <Typography variant="h4">Course Not Found</Typography>
        </div>
      ) : (
        <>{<SingleMyCourse data={props.data.single_course} />}</>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});
const mapActionToProps = {
  getSingleMyCourse,
};

const useStyles = makeStyles({
  root: {
    margin: "10px 0",
    minHeight: "360px",
    color: "#1b1b2f",
    marginBottom: "2rem",
  },
  header: { marginBottom: "10px", color: "var(--mainColor)" },
  paper: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: "10px",
    background: "var(--mainColor)",
    color: "white",
    border: "1px solid var(--mainColor)",
    padding: "10px",
    width: "20%",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      background: "#304866",
      border: "1px solid #304866",
    },
  },
});

export default connect(mapStateToProps, mapActionToProps)(PageSingleMyCourse);
