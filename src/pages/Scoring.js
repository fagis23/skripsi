import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ScoringComponent from "../components/Scoring/Scoring";
import axios from "../config/axios";
import { getMyCourse } from "../redux/actions/action_data";
import TextField from "@material-ui/core/TextField";

const Scoring = (props) => {
  const { id, role } = props.user.credentials;
  const [course, setCourse] = useState("");
  const { my_course, loading_my_course } = props.data;
  const [scoreUser, setScoreUser] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [statusScore, setStatusScore] = useState("");
  const [allScoreLecturer, setAllScoreLecturer] = useState([]);

  useEffect(() => {
    if (my_course.length === 0) {
      props.getMyCourse(id);
    }

    if (role === "Lecturer") {
      setLoading(true);
      axios
        .get("/iati/upload-file/getAllAnswer")
        .then((res) => {
          setLoading(false);
          setAllScoreLecturer(res.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (my_course.length !== 0) {
      setLoading(true);
      axios
        .get(
          `/iati/score/v1/getScore?courseId=${my_course[0].course.id}&userId=${id}`
        )
        .then((res) => {
          setLoading(false);
          setScoreUser(res.data);
          setStatusScore("");
        })
        .catch((err) => {
          setLoading(false);
          setStatusScore("");
        });
    }
  }, [my_course]);

  const handleChangeCourse = (e) => {
    const courseId = e.target.value;
    setCourse(courseId);
    setLoading(true);
    axios
      .get(`/iati/score/v1/getScore?courseId=${courseId}&userId=${id}`)
      .then((res) => {
        setLoading(false);
        setScoreUser(res.data);
        setStatusScore("");
      })
      .catch((err) => {
        setLoading(false);
        setStatusScore("");
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Scoring</h1>
      </div>
      {role === "Lecturer" ? (
        <div className={classes.scoreTable}>
          <div className="table-header">
            <h4>User_Id</h4>
            <h4>Course_Id</h4>
            <h4>Course Name</h4>
            <h4>Action</h4>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : setAllScoreLecturer.length === 0 ? (
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                padding: "1rem",
                borderBottom: "2px solid rgb(210,210,210)",
              }}
            >
              <h4>Score tida ada</h4>
            </div>
          ) : (
            allScoreLecturer.map((score, index) => {
              return <ScoringComponent key={index} lecturer score={score} />;
            })
          )}
        </div>
      ) : (
        <React.Fragment>
          {loading_my_course ? (
            <p>Loading...</p>
          ) : (
            <TextField
              id="standard-select-currency"
              select
              label="Select Course"
              value={course}
              onChange={handleChangeCourse}
              style={{
                width: "40%",
                margin: "10px 0 1.5rem 0",
                fill: "white",
              }}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
              {my_course.map((option) => (
                <option key={option.course.id} value={option.course.id}>
                  {option.course.courseName} - {option.course.id}
                </option>
              ))}
            </TextField>
          )}
          <div className={classes.scoreTable}>
            <div className="table-header">
              <h4>User_Id</h4>
              <h4>Course_Id</h4>
              <h4>Course Name</h4>
              <h4>Score</h4>
            </div>
            {loading ? (
              <div
                style={{
                  display: "grid",
                  justifyItems: "center",
                  padding: "1rem",
                  borderBottom: "2px solid rgb(210,210,210)",
                }}
              >
                <h4>Loading...</h4>
              </div>
            ) : scoreUser.length === 0 ? (
              <div
                style={{
                  display: "grid",
                  justifyItems: "center",
                  padding: "1rem",
                  borderBottom: "2px solid rgb(210,210,210)",
                }}
              >
                <h4>Harap pilih course</h4>
              </div>
            ) : (
              <ScoringComponent score={scoreUser} />
            )}
          </div>
          <div style={{ marginTop: "1rem" }}>
            {loading ? (
              <p></p>
            ) : (
              statusScore !== "" && (
                <p style={{ color: "red" }}>Course tidak memiliki score</p>
              )
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
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
    color: "var(--mainColor)",
    marginBottom: "1rem",
  },
  scoreTable: {
    textAlign: "center",
    "& .table-header": {
      borderRadius: "4px 4px 0 0",
      display: "grid",
      gridTemplateColumns: "0.4fr 0.6fr 1fr 1fr",
      background: "var(--mainColor)",
      border: "1px solid var(--mainColor)",
      padding: "1rem 0",
      color: "white",
    },
  },
});

export default connect(mapStateToProps, { getMyCourse })(Scoring);
