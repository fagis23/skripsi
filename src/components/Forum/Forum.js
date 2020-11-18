import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { updateStatusForum } from "../../redux/actions/action_data";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import CardForum from "../CardForum/CardForum";
import CreateNewComment from "./CreateNewComment";

const Forum = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const { postQuestion, postStatus, postApplicationId } = props.data;
  const { userId, username } = props.data.userTable;
  const { id } = props.user.credentials;

  useEffect(() => {
    document.title = `Forum: ${postQuestion}`;
    if (postStatus === "OPEN") {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, []);

  const handleClickUpdateStatus = () => {
    let data;

    if (postStatus === "OPEN") {
      data = {
        postId: postApplicationId,
        status: "SOLVED",
      };
      if (window.confirm("Update status to SOLVED?")) {
        props.updateStatusForum(data);
      }
    } else {
      data = {
        postId: postApplicationId,
        status: "OPEN",
      };
      if (window.confirm("Update status to OPEN?")) {
        props.updateStatusForum(data);
      }
    }
  };

  let dialogCreateNewComment = (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <CreateNewComment
        onClose={() => setOpen(false)}
        postId={postApplicationId}
      />
    </Dialog>
  );

  let filterComment = props.comment.reverse();

  return (
    <div className={classes.root}>
      {dialogCreateNewComment}
      <div className={classes.header}>
        <div className="postDesc">
          <Typography variant="h4">{postQuestion}</Typography>
          <Typography variant="subtitle1">
            created by : <b style={{ color: "var(--mainColor)" }}>{username}</b>
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          {userId === id && status !== "SOLVED" && (
            <div
              className={classes.updateStatus}
              onClick={handleClickUpdateStatus}
            >
              <Typography variant="subtitle1">Update Status</Typography>
            </div>
          )}
          <div
            className={status ? "status-solved" : "status-unsolved"}
            style={{ marginLeft: "1rem" }}
          >
            <Typography variant="subtitle1">{postStatus}</Typography>
          </div>
        </div>
      </div>
      <Paper className={classes.container}>
        <CardForum data={props.data} owner />
        {!status && (
          <button className={classes.button} onClick={() => setOpen(true)}>
            Reply
          </button>
        )}

        <hr
          style={{
            border: "0.5px solid var(--mainColor)",
            margin: "1.5rem 0",
          }}
        />
        {props.comment.length === 0 ? (
          <div className={classes.emptyComment}>
            <Typography variant="h6" style={{ color: "var(--mainColor)" }}>
              Belum ada comment, jadilah yang pertama!
            </Typography>
          </div>
        ) : (
          filterComment.map((com, index) => {
            return <CardForum key={index} comment={com} user />;
          })
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const useStyles = makeStyles({
  root: {},
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 0.5fr",
    alignItems: "center",
    marginBottom: "20px",
    gridColumnGap: "10px",
    "& .postDesc": {
      marginRight: "auto",
    },
    "& .status-unsolved": {
      padding: "5px 2px",
      background: "var(--unsolved)",
      color: "white",
      borderRadius: "1rem",
      width: "100%",
      textAlign: "center",
      flex: 1,
    },
    "& .status-solved": {
      padding: "5px 2px",
      background: "var(--solved)",
      color: "white",
      borderRadius: "1rem",
      width: "100%",
      textAlign: "center",
      flex: 1,
    },
  },
  container: {
    padding: "1rem",
  },
  button: {
    padding: "10px 20px",
    background: "var(--mainColor)",
    color: "white",
    border: "1px solid var(--mainColor)",
    marginTop: "1rem",
    display: "flex",
    width: "20%",
    marginLeft: "auto",
    justifyContent: "center",
    borderRadius: "6px",
    cursor: "pointer",
    outline: "none",
  },
  emptyComment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  btnSolved: {
    padding: "10px 20px",
    background: "grey",
    color: "white",
    border: "1px solid grey",
    marginTop: "1rem",
    display: "flex",
    width: "20%",
    marginLeft: "auto",
    justifyContent: "center",
    borderRadius: "6px",
    cursor: "not-allowed",
  },
  updateStatus: {
    background: "#888888",
    padding: "5px 2px",
    borderRadius: "1rem",
    color: "white",
    cursor: "pointer",
    flex: 1,
    textAlign: "center",
  },
});

export default connect(mapStateToProps, { updateStatusForum })(Forum);
