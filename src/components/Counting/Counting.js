import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Typography } from "@material-ui/core";

const Counting = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.loading ? (
        <Typography
          variant="h6"
          style={{ marginTop: "8px", color: "var(--mainColor)" }}
        >
          Loading...
        </Typography>
      ) : (
        <Paper className={classes.paperData}>
          <Typography variant="h5">{props.header}</Typography>
          <Typography
            variant="h4"
            style={{ marginTop: "8px", color: "var(--mainColor)" }}
          >
            {props.count}
          </Typography>
        </Paper>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  paperData: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
});

export default Counting;
