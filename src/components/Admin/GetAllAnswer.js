import React, { useState, useEffect } from "react";

import axios from "../../config/axios";
import makeStyles from "@material-ui/core/styles/makeStyles";

const GetAllAnswer = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [download, setDownload] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/iati/user/v1/${props.userId}/profile`)
      .then((res) => {
        setLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const downloadLsp = (userId) => {
    setDownload(true);
    axios
      .get(`/iati/upload-file/getAnswer/${userId}`)
      .then((res) => {
        const linkSource = `data:application/pdf;base64,${res.data}`;
        const downloadLink = document.createElement("a");
        const fileName = `${userId}_Answer.pdf`;
        setDownload(false);
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.table}>
        <div className={classes.header}>
          {loading ? <h4>...</h4> : <h4>{user.username}</h4>}
          {loading ? (
            <h4>...</h4>
          ) : download ? (
            <h4>Downloading File ....</h4>
          ) : (
            <h4 onClick={() => downloadLsp(props.userId)}>Download Answer</h4>
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    height: "100%",
    color: "white",
    padding: "14px 0",
    "&:nth-child(odd)": {
      background: "var(--mainColor)",
    },
    "&:nth-child(even)": {
      background: "var(--darkColor)",
    },
  },
  header: {
    display: "flex",
    textAlign: "center",
    "& h4:nth-child(1)": {
      flex: 1,
    },
    "& h4:nth-child(2)": {
      flex: 1,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
});

export default GetAllAnswer;
