import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

import { Typography } from "@material-ui/core";

const Article = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.article}>
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            color: "var(--darkColor)",
          }}
        >
          Article IATI
        </Typography>
        <div className={classes.newPaperContainer}>
          <Paper className={classes.newPaper}>
            <div className={classes.card}>
              <h4 className="nomor">Article 1</h4>
              <a
                href="http://auditteknologi.blogspot.com/2020/05/epp-enterprise-project-performance.html"
                className="course"
                target="_blank"
                rel="noopener noreferrer"
              >
                EPP (Enterprise Project Performance)
              </a>
            </div>
          </Paper>
          <Paper className={classes.newPaper}>
            <div className={classes.card}>
              <h4 className="nomor">Article 2</h4>
              <a
                href="http://auditteknologi.blogspot.com/2020/05/digitalisasi-solusi-industri-dalam.html"
                className="course"
                target="_blank"
                rel="noopener noreferrer"
              >
                DIGITALISASI solusi INDUSTRI dalam menghadapi COVID 19
              </a>
            </div>
          </Paper>
          <Paper className={classes.newPaper}>
            <div className={classes.card}>
              <h4 className="nomor">Article 3</h4>
              <a
                href="http://auditteknologi.blogspot.com/2019/12/profesi-auditor-teknologi-dan-okupasi.html"
                className="course"
                target="_blank"
                rel="noopener noreferrer"
              >
                Profesi Auditor Teknologi dan Okupasi Auditor Teknologi
              </a>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    margin: "3rem 0",
    "& a": {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
        color: "black",
      },
    },
  },
  newPaperContainer: {
    marginTop: "10px",
    maxHeight: "300px",
    overflow: "auto",
    padding: "0 10px 2px 0",
  },
  newPaper: {
    marginBottom: "5px",
    cursor: "pointer",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "& .nomor": {
      flex: 0.3,
      background: "var(--darkColor)",
      padding: "1rem 0",
      color: "white",
    },
    "& .course": {
      flex: 1,
      color: "var(--darkColor)",
    },
  },
  article: {
    marginTop: "1rem",
  },
});

export default Article;
