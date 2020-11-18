import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getSingleForum } from "../redux/actions/action_data";
import { clearMessage } from "../redux/actions/action_ui";
import Forum from "../components/Forum/Forum";

import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const PageSingleForum = (props) => {
  const urlParams = new URLSearchParams(props.location.search);
  const id_forum = urlParams.get("id");
  const classes = useStyles();

  useEffect(() => {
    props.getSingleForum(id_forum);
  }, []);

  useEffect(() => {
    if (props.ui.status === "status") {
      setTimeout(() => {
        props.clearMessage();
      }, 5000);
    }
  }, [props.ui.status]);

  const { loading_single_forum, single_forum } = props.data;

  return (
    <div className={classes.root}>
      {loading_single_forum ? (
        <div className={classes.loading}>
          <CircularProgress
            style={{ color: "var(--mainColor)", fontsize: "30px" }}
          />
        </div>
      ) : single_forum.postApplication === undefined ? (
        <div className={classes.loading}>
          <CircularProgress
            style={{ color: "var(--mainColor)", fontsize: "30px" }}
          />
        </div>
      ) : (
        <div>
          {props.ui.flash && props.ui.status === "status" && (
            <div style={{ margin: "14px 0", width: "100%" }}>
              <Alert
                severity="success"
                onClose={() => props.clearMessage()}
                variant="filled"
              >{`${props.ui.flash}`}</Alert>
            </div>
          )}
          <div
            style={{
              marginBottom: "10px",
              color: "var(--mainColor)",
              cursor: "pointer",
            }}
            onClick={() => props.history.goBack()}
          >
            <ArrowBack style={{ fontSize: "30px" }} />
          </div>
          <Forum
            data={single_forum.postApplication}
            comment={single_forum.commentResponses}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  ui: state.ui,
});
const mapActionToProps = {
  getSingleForum,
  clearMessage,
};

const useStyles = makeStyles({
  root: {
    margin: "10px 0 2rem 0",
    minHeight: "360px",
    color: "#1b1b2f",
    padding: "0 7rem",
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
  loading: {
    height: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default connect(mapStateToProps, mapActionToProps)(PageSingleForum);
