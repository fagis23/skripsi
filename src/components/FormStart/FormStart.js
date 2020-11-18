import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Welcome = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <div className="slider">
          <img src="/img/banner-1.jpg" alt="img" />
        </div>
      </div>
      <div className={classes.dialog}>
        <div className="card">{props.children}</div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
  },
  logo: {
    flex: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 3rem",
    background: "var(--mainColor)",
    "& .slider": {
      width: "100%",
      textAlign: "center",
      height: "400px",
      borderRadius: "10px",
      "& img": {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        objectFit: "cover",
      },
    },
  },
  dialog: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& .card": {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 4rem",
    },
  },
});

export default Welcome;
