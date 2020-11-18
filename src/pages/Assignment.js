import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import axios from "../config/axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AssginmetComponent from "../components/Assignment/Assignment";
import CircularProgress from "@material-ui/core/CircularProgress";

const Assignment = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = props.user.credentials;

  useEffect(() => {
    document.title = "Assignment";
    setLoading(true);
    axios
      .get(`/iati/material/info/quiz/${id}`)
      .then((res) => {
        setLoading(false);
        setQuiz(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Assignment</h1>
      </div>

      {/* Idividual Assignment */}
      <div className={classes.assignment}>
        <div className={classes.header}>
          <h4>Individual Assignment</h4>
        </div>
        <div className={classes.assignmentTable}>
          <div className={classes.assignmentHeaderTable}>
            <div>
              <h4>Course Id</h4>
            </div>
            <div>
              <h4>Title</h4>
            </div>
            <div>
              <h4>Action</h4>
            </div>
          </div>
          {loading ? (
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <CircularProgress style={{ color: "var(--mainColor)" }} />
            </div>
          ) : quiz.length === 0 ? (
            <p style={{ padding: "0 0 20px 0", textAlign: "center" }}>
              No Individual assignment have been uploaded yet
            </p>
          ) : (
            quiz.map((qz) => {
              return (
                <AssginmetComponent
                  key={qz.id}
                  data={qz}
                  emptyTitle="No Individual assignment have been uploaded yet"
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    minHeight: "350px",
    textAlign: "justify",
    padding: "0 7rem",
    marginBottom: "2rem",
  },
  header: {
    marginBottom: "10px",
  },
  assignment: {
    padding: "1.2em",
  },
  assignmentTable: {
    boxShadow: "0 0 2px gray",
  },
  assignmentHeaderTable: {
    marginTop: "1em",
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    padding: "1em 0",
    background: "rgb(235,235,235)",
    justifyItems: "center",
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(Assignment);
