import {
  SET_COURSE_ADMIN,
  SET_MATERIAL_ADMIN,
  LOADING_COURSE_ADMIN,
  LOADING_MATERIAL_ADMIN,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_FLASH_MESSAGE,
  LOADING_UI,
  SET_ALL_ANSWER,
  UNSET_MATERIAL_ADMIN,
} from "../types";
import axios from "../../config/axios";
import { materialValidation, courseValidation } from "../../utils/validation";

export const getCourseAdmin = () => (dispatch) => {
  dispatch({ type: LOADING_COURSE_ADMIN });
  axios
    .get("/iati/course/v1/info/all")
    .then((res) => {
      dispatch({ type: SET_COURSE_ADMIN, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMaterialAdmin = (course_id) => (dispatch) => {
  dispatch({ type: LOADING_MATERIAL_ADMIN });
  axios
    .get(`/iati/course/v1/${course_id}/info/taken/detail`)
    .then((res) => {
      dispatch({ type: SET_MATERIAL_ADMIN, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMaterialsAdmin = (data, close) => (dispatch) => {
  const { errors, valid } = materialValidation(data);
  if (!valid) {
    return dispatch({ type: SET_ERRORS, payload: errors });
  } else {
    dispatch({ type: LOADING_UI });
    axios
      .post("/iati/material/manipulation/addMaterial", data)
      .then(() => {
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
          type: SET_FLASH_MESSAGE,
          payload: `Material berhasil ditambahkan pada courseId : ${data.courseId}`,
          status: "admin",
        });
        close();
        dispatch(getMaterialAdmin(data.courseId));
      })
      .catch((err) => {
        if (err.response.status === 400) {
          dispatch({
            type: SET_ERRORS,
            payload: { materialLevel: "Material Level sudah ada" },
          });
        }
      });
  }
};
export const uploadFileMaterial = (data, materialId, courseId) => (
  dispatch
) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/iati/upload-file/request/material?materialId=${materialId}`, data)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_FLASH_MESSAGE,
        payload: `File berhasil ditambahkan pada material : ${materialId}`,
        status: "admin",
      });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const addCourse = (data, close) => (dispatch) => {
  const { errors, valid } = courseValidation(data);
  if (!valid) {
    return dispatch({ type: SET_ERRORS, payload: errors });
  } else {
    dispatch({ type: LOADING_UI });
    axios
      .post("/iati/course/v1/add", data)
      .then(() => {
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
          type: SET_FLASH_MESSAGE,
          payload: `Course berhasil ditambahkan`,
          status: "admin",
        });
        close();
        dispatch(getCourseAdmin());
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
        alert("Something went wrong!");
      });
  }
};

export const unsetMaterial = () => (dispatch) => {
  dispatch({ type: UNSET_MATERIAL_ADMIN });
};

export const getAllAnswer = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/iati/upload-file/getAllAnswer")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_ALL_ANSWER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadFileQuestion = (data) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/iati/upload-file/request/question", data)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_FLASH_MESSAGE,
        payload: `File berhasil di upload`,
        status: "admin-lsp",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
