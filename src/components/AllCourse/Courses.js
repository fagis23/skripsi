import React from "react";
import Course from "./Course";

import makeStyles from "@material-ui/core/styles/makeStyles";
import InfoIcon from "@material-ui/icons/Info";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Typography } from "@material-ui/core";

const Courses = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.mycourse ? (
        props.loading ? (
          <Typography variant="h4" style={{ marginTop: "20px" }}>
            <CircularProgress style={{ color: "var(--mainColor)" }} />
          </Typography>
        ) : props.datamycourse.length === 0 ? (
          <div className={classes.emptyCourse}>
            <InfoIcon className="icon" />
            <Typography variant="h4">You dont have any course yet</Typography>
          </div>
        ) : (
          <div className={classes.newPaperContainer}>
            {props.datamycourse.map((course, index) => {
              return (
                <Course key={index} data={course} mycourse index={index} />
              );
            })}
          </div>
        )
      ) : props.courses && props.loading ? (
        <Typography variant="h4" style={{ marginTop: "20px" }}>
          <CircularProgress style={{ color: "var(--mainColor)" }} />
        </Typography>
      ) : props.datacourses.length === 0 ? (
        <div className={classes.emptyCourse}>
          <InfoIcon className="icon" />
          <Typography variant="h5">
            Our courses is empty, stay tuned!
          </Typography>
        </div>
      ) : (
        <div className={classes.newPaperContainer}>
          {props.datacourses.map((course, index) => {
            return <Course key={index} data={course} courses index={index} />;
          })}
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  emptyCourse: {
    width: "100%",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    borderRadius: "4px",
    color: "var(--mainColor)",
    flexDirection: "column",
    border: "1px solid var(--mainColor)",
    "& .icon": {
      fontSize: "80px",
      marginBottom: "10px",
    },
  },
  newPaperContainer: {
    marginTop: "10px",
    maxHeight: "300px",
    overflow: "auto",
    padding: "0 10px 2px 0",
  },
  newPaper: {
    marginBottom: "5px",
    cursor: "pointer",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "& .nomor": {
      flex: 0.3,
      background: "var(--mainColor)",
      padding: "1rem 0",
      color: "white",
    },
    "& .course": {
      flex: 1,
      color: "var(--mainColor)",
    },
  },
});

export default Courses;
