import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.copyright}>
        <h2>IATI</h2>
        <small>Copyright &copy; {new Date().getFullYear()} </small>
      </div>
      <div className={classes.socialMedia}>
        <h4 style={{ marginBottom: "5px" }}>Getting Trouble? Contact Us!</h4>
        <InstagramIcon className={classes.icon} />
        <WhatsAppIcon className={classes.icon} />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    height: "20vh",
    width: "100%",
    background: "var(--mainColor)",
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    color: "white",
    position: "relative",
    clear: "both",
  },
  copyright: {
    textAlign: "left",
  },
  icon: {
    fontSize: "25px",
    marginRight: "6px",
    cursor: "pointer",
  },
});

export default Footer;
