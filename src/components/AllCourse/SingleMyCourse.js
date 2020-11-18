import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CardCourse from "./CardCourse/CardCourse";

const SingleMyCourse = (props) => {
  const classes = useStyles();
  const {
    courseName,
    courseDescription,
    materials,
    learningOutcomes,
    reference,
  } = props.data;
  const [openLO, setOpenLO] = useState(false);

  useEffect(() => {
    if (courseName === undefined) {
      document.title = "Course";
    } else {
      document.title = `Course: ${courseName}`;
    }
  }, [courseName]);

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Typography variant="h4" className={classes.header}>
          {courseName}
        </Typography>
        <Typography variant="h5">Description</Typography>
        <Typography variant="h6">{courseDescription}</Typography>
        <div
          style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}
        >
          <div
            style={{
              borderBottom: "1px solid white",
              width: "100%",
            }}
          />
          {openLO ? (
            <div
              onClick={() => setOpenLO(false)}
              style={{ marginLeft: "2rem", width: "10%", cursor: "pointer" }}
            >
              <Typography variant="subtitle1">Hide</Typography>
            </div>
          ) : (
            <div
              onClick={() => setOpenLO(true)}
              style={{ marginLeft: "2rem", width: "10%", cursor: "pointer" }}
            >
              <Typography variant="subtitle1">Show More</Typography>
            </div>
          )}
        </div>
        {openLO && (
          <div>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              COURSE INFORMATION
            </Typography>
            <div style={{ padding: "1rem" }}>
              <Typography variant="h5" style={{ marginBottom: "10px" }}>
                Learning Outcomes
              </Typography>
              <Typography variant="subtitle1">
                {learningOutcomes === null ? "-" : learningOutcomes}
              </Typography>
              <div
                style={{
                  borderBottom: "1px solid white",
                  width: "100%",
                  margin: "1rem 0",
                }}
              />
              <Typography variant="h5" style={{ marginBottom: "10px" }}>
                Reference
              </Typography>
              <Typography variant="subtitle1">{reference}</Typography>
            </div>
          </div>
        )}
      </div>
      <div className={classes.material}>
        {materials !== undefined &&
          materials
            .sort((a, b) => {
              return a.materialLevel - b.materialLevel;
            })
            .map((material, index) => {
              return <CardCourse key={index} data={material} />;
            })}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  header: { marginBottom: "1.5rem" },
  material: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
    textAlign: "center",
    padding: "0 7rem",
  },
  main: {
    background: "var(--mainColor)",
    marginBottom: "1.5rem",
    padding: "1em 7rem",
    color: "white",
    textAlign: "justify",
  },
});

export default SingleMyCourse;
