import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllForum, getMyCourse } from "../redux/actions/action_data";
import { clearMessage } from "../redux/actions/action_ui";
import { getFullDate } from "../utils/date";
import CreateNewThread from "../components/Forum/CreateNewThread";
import Alert from "@material-ui/lab/Alert";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columnTable = [
  { id: "no", label: "Created Forum" },
  { id: "thread", label: "Thread Title" },
  { id: "last reply", label: "Last Reply" },
  { id: "status", label: "Status" },
];

const Forum = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState("");
  const { loading_forum, forum, my_course } = props.data;

  useEffect(() => {
    document.title = "Forum";
    props.getMyCourse(props.user.credentials.id);
  }, []);

  useEffect(() => {
    if (my_course.length !== 0) {
      props.getAllForum(my_course[0].course.id);
    }
  }, [my_course]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let dialogCreateNewThread = (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <CreateNewThread onClose={handleClose} />
    </Dialog>
  );

  const getDate = (text) => {
    let split;
    if (text !== null) {
      split = text.split(" ")[0];
    } else {
      split = "-";
    }
    return split;
  };

  const handleChangeCourse = (e) => {
    setCourse(e.target.value);
    props.getAllForum(e.target.value);
  };

  return (
    <div className={classes.root}>
      {loading_forum ? (
        <div className={classes.loading}>
          <CircularProgress
            style={{ color: "var(--mainColor)", fontsize: "30px" }}
          />
        </div>
      ) : (
        <>
          <div className={classes.header}>
            <Typography variant="h4">Forum</Typography>
            <button onClick={handleClickOpen}>Create Thread</button>
          </div>
          {props.ui.flash && props.ui.status === "thread" && (
            <div style={{ margin: "14px 0", width: "100%" }}>
              <Alert
                severity="success"
                onClose={() => props.clearMessage()}
                variant="filled"
              >{`${props.ui.flash}`}</Alert>
            </div>
          )}
          <div>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Select Course"
              value={course}
              onChange={handleChangeCourse}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              style={{ margin: "1.5rem 0 4px 0", width: "100%" }}
            >
              {my_course.map((option) => {
                return (
                  <option key={option.course.id} value={option.course.id}>
                    {option.course.courseName} - {option.course.id}
                  </option>
                );
              })}
            </TextField>
          </div>
          {forum.length === 0 ? (
            <p>Forum tidak ada</p>
          ) : (
            <Paper className={classes.forum}>
              <TableContainer>
                <Table>
                  <TableHead
                    style={{ background: "var(--mainColor)", color: "white" }}
                  >
                    <TableRow>
                      {columnTable.map((column) => (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ color: "white" }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {forum.length === 0 ? (
                      <TableRow style={{ cursor: "pointer" }}>
                        <TableCell
                          align="center"
                          colSpan={4}
                          style={{ color: "var(--mainColor)" }}
                        >
                          No Thread For This Course
                        </TableCell>
                      </TableRow>
                    ) : (
                      forum
                        .sort((a, b) => b.createdDateTime - a.createdDateTime)
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((frm, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={frm.postApplicationId}
                              style={{ cursor: "pointer" }}
                              // component={Link}
                              // to={`/forum/details?id=${frm.postApplicationId}`}
                              onClick={() =>
                                props.history.push(
                                  `/forum/details?id=${frm.postApplicationId}`
                                )
                              }
                            >
                              <TableCell
                                align="center"
                                style={{ color: "var(--mainColor)" }}
                              >
                                {getFullDate(frm.createdDateTime)}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ color: "var(--mainColor)" }}
                              >
                                {frm.postQuestion}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ color: "var(--mainColor)" }}
                              >
                                {getDate(frm.lastReply)}
                              </TableCell>
                              <TableCell
                                align="center"
                                className={
                                  frm.postStatus === "SOLVED"
                                    ? classes.solved
                                    : classes.open
                                }
                              >
                                {frm.postStatus}
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={forum.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          )}

          {dialogCreateNewThread}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  ui: state.ui,
});
const mapActionToProps = {
  getAllForum,
  clearMessage,
  getMyCourse,
};

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    minHeight: "350px",
    padding: "0 7rem",
    marginBottom: "2rem",
  },
  loading: {
    height: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    "& button": {
      padding: "10px",
      background: "var(--mainColor)",
      border: "1px solid var(--mainColor)",
      marginLeft: "auto",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        background: "#304866",
        border: "1px solid #304866",
      },
    },
  },
  forum: {
    marginTop: "20px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    textTransform: "uppercase",
    background: "var(--mainColor)",
    color: "white",
    borderRadius: "4px 4px 0 0",
    fontWeight: "bold",
    "& h6:nth-child(1)": {
      flex: 0.3,
      padding: "10px 0",
    },
    "& h6:nth-child(2)": {
      flex: 1,
      padding: "10px 0",
    },
    "& h6:nth-child(3)": {
      flex: 0.5,
      padding: "10px 0",
    },
    "& h6:nth-child(4)": {
      flex: 0.5,
      padding: "10px 0",
    },
  },
  solved: {
    color: "var(--solved)",
  },
  open: {
    color: "var(--unsolved)",
  },
});

export default connect(mapStateToProps, mapActionToProps)(Forum);
