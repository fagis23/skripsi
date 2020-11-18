import {
  SET_AVAILABLE_COURSE,
  SET_SINGLE_COURSE,
  SET_MY_COURSE,
  SET_LOADING_AVAILABLE_COURSE,
  SET_LOADING_SINGLE_COURSE,
  SET_LOADING_MY_COURSE,
  SET_SINGLE_FORUM,
  SET_LOADING_SINGLE_FORUM,
  SET_ERRORS,
  SET_LOADING_FORUM,
  SET_FORUM,
  SET_STATUS,
  STATUS_UPLOAD,
} from "../types";

import axios from "../../config/axios";
import { threadValidation, commentValidation } from "../../utils/validation";
import { setError, clearError, setMessage, setLoadingUi } from "./action_ui";

export const getMyCourse = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING_MY_COURSE });
  axios
    .get(`/iati/course/v1/${id}/info/taken`)
    .then((res) => {
      dispatch({ type: SET_MY_COURSE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_MY_COURSE, payload: [] });
    });
};

export const getSingleMyCourse = (course_id) => (dispatch) => {
  dispatch({ type: SET_LOADING_SINGLE_COURSE });
  axios
    .get(`/iati/course/v1/${course_id}/info/taken/detail`)
    .then((res) => {
      dispatch({ type: SET_SINGLE_COURSE, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: SET_SINGLE_COURSE,
        payload: err.response.status,
      });
    });
};

export const getAvalaibleCourse = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING_AVAILABLE_COURSE });
  axios
    .get(`/iati/course/v1/${id}/info/available`)
    .then((res) => {
      dispatch({ type: SET_AVAILABLE_COURSE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_AVAILABLE_COURSE, payload: [] });
    });
};

export const getSingleAvailableCourse = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING_SINGLE_COURSE });
  axios
    .get(`/iati/course/v1/${id}/info/available/detail`)
    .then((res) => {
      dispatch({ type: SET_SINGLE_COURSE, payload: res.data });
      dispatch({ type: SET_STATUS, payload: "not taken" });
    })
    .catch((err) => {
      dispatch({
        type: SET_SINGLE_COURSE,
        payload: err.response.status,
      });
    });
};

export const getAllForum = (courseId) => (dispatch) => {
  dispatch({ type: SET_LOADING_FORUM });
  axios
    .get(`/iati/post/v1/viewAllPost/${courseId}`)
    .then((res) => {
      dispatch({ type: SET_FORUM, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getSingleForum = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING_SINGLE_FORUM });
  axios
    .get(`/iati/post/v1/view/${id}/forum`)
    .then((res) => {
      dispatch({ type: SET_SINGLE_FORUM, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createNewThread = (data, close) => (dispatch) => {
  const getValue = {
    topic: data.get("topic"),
    question: data.get("question"),
    description: data.get("description"),
  };
  const { valid, errors } = threadValidation(getValue);
  if (!valid) {
    dispatch(setError(errors));
  } else {
    dispatch(setLoadingUi());
    axios
      .post(`/iati/post/v1/addPost`, data)
      .then(() => {
        close();
        dispatch(clearError());
        dispatch(
          setMessage({
            payload: `Thread berhasil ditambahkan pada course ${data.get(
              "courseId"
            )}`,
            status: "thread",
          })
        );
        dispatch(getAllForum());
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  }
};

export const takeCourse = (data, history) => (dispatch) => {
  dispatch({ type: SET_LOADING_SINGLE_COURSE });
  axios
    .post(`/iati/course/v1/take/course`, data)
    .then(() => {
      dispatch({ type: SET_SINGLE_COURSE, payload: {} });
      history.push("/course");
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const craeteNewComment = (data, close) => (dispatch) => {
  dispatch(setLoadingUi());
  const getValue = { comment: data.get("comment") };
  const { errors, valid } = commentValidation(getValue);
  if (!valid) {
    dispatch({ type: SET_ERRORS, payload: errors });
  } else {
    axios
      .post(`/iati/comment/v1/addComment`, data)
      .then(() => {
        close();
        dispatch(clearError());
        dispatch(
          setMessage({
            payload: "Comment Berhasil ditambahkan",
            status: "comment",
          })
        );
        dispatch(getSingleForum(data.get("postId")));
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  }
};

export const updateStatusForum = (data) => (dispatch) => {
  dispatch(setLoadingUi());
  axios
    .post(`/iati/post/v1/view/forum/update/status`, data)
    .then((res) => {
      dispatch(clearError());
      dispatch(
        setMessage({ payload: "Update status success", status: "status" })
      );
      dispatch(getSingleForum(data.postId));
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const downloadTest = (data) => (dispatch) => {
  dispatch(setLoadingUi());
  if (data.courseId === "") {
    dispatch(clearError());
    alert("Harap memilih course");
  } else {
    axios
      .get(
        `/iati/upload-file/getAnswer/${data.userId}?courseId=${data.courseId}`
      )
      .then((res) => {
        dispatch(clearError());
        if (res.data === "") {
          alert("Data Belum ada");
        } else {
          data.close();
          const linkSource = `data:application/pdf;base64,${res.data}`;
          const downloadLink = document.createElement("a");
          const fileName = `Test-Iati.pdf`;
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      })
      .catch((err) => {
        dispatch(clearError());
        console.log(err);
      });
  }
};

export const uploadFileTest = (file, data) => (dispatch) => {
  dispatch(setLoadingUi());
  if (data.courseId === "") {
    dispatch(clearError());
    alert("Harap memilih course");
  } else {
    axios
      .post(
        `/iati/upload-file/request/answer?userId=${data.userId}&courseId=${data.courseId}`,
        file
      )
      .then(() => {
        dispatch(clearError());
        alert("File berhasil di upload");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// For Lecture

export const submitScoreLecture = (data) => (dispatch) => {
  dispatch(setLoadingUi());
  axios
    .post("/iati/score/v1/submit", data)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const uploadSoalLecture = (data, courseId) => (dispatch) => {
  dispatch({ type: STATUS_UPLOAD, payload: "PENDING" });
  axios
    .post(`/iati/upload-file/request/question?courseId=${courseId}`, data)
    .then(() => {
      dispatch(
        setMessage({
          payload: `File dengan id ${courseId} berhasil di upload (click pesan ini untuk menghapus pemberitahuan)`,
          status: "assesment",
        })
      );
      dispatch({ type: STATUS_UPLOAD, payload: null });
    })
    .catch((err) => {
      dispatch({ type: STATUS_UPLOAD, payload: null });
    });
};
