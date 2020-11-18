import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/action_user";
import { unsetMaterial } from "../../redux/actions/action_admin";
import { clearMessage } from "../../redux/actions/action_ui";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Navbar = (props) => {
  const classes = useStyles();
  const { status, role } = props.user.credentials;

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <img
            src="/img/logo.jpg"
            alt="Logo"
            style={{
              height: "40px",
              width: "40px",
              marginRight: "14px",
              borderRadius: "4px",
            }}
          />
          <Typography
            variant="h5"
            style={{ marginRight: "auto", textTransform: "uppercase" }}
          >
            iati online learning
          </Typography>
          {status !== "ADMIN" ? (
            <div>
              <NavLink exact to="/" className={classes.Link}>
                home
              </NavLink>
              <NavLink exact to="/course" className={classes.Link}>
                Course
              </NavLink>
              {role !== "Lecturer" && (
                <NavLink exact to="/assignment" className={classes.Link}>
                  Assignment
                </NavLink>
              )}
              <NavLink exact to="/forum" className={classes.Link}>
                Forum
              </NavLink>
              <NavLink exact to="/assesment" className={classes.Link}>
                Assesment
              </NavLink>
              <NavLink exact to="/scoring" className={classes.Link}>
                Scoring
              </NavLink>
              <button className={classes.logoutBtn} onClick={props.logout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <NavLink
                exact
                to="/course"
                className={classes.Link}
                onClick={props.unsetMaterial}
              >
                Course
              </NavLink>
              <NavLink
                exact
                to="/lsp"
                className={classes.Link}
                onClick={props.clearMessage}
              >
                LSP
              </NavLink>
              <button className={classes.logoutBtn} onClick={props.logout}>
                Logout
              </button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    background: "var(--mainColor)",
    padding: "0 6rem",
    color: "white",
  },
  Link: {
    marginLeft: "1.5rem",
    textDecoration: "none",
    textTransform: "capitalize",
    color: "white",
    fontSize: "1.1rem",
    "&:hover": {
      color: "var(--brightColor)",
    },
    "&.active": {
      color: "var(--brightColor)",
    },
  },
  logoutBtn: {
    marginLeft: "1.5rem",
    padding: "6px 1rem",
    background: "white",
    color: "var(--mainColor)",
    border: "1px solid white",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
});

export default connect(mapStateToProps, {
  logout,
  unsetMaterial,
  clearMessage,
})(Navbar);
