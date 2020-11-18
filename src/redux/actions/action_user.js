import axios from "../../config/axios";
import {
  loginValidation,
  registerValidation,
  editProfileValidate,
} from "../../utils/validation";

import {
  SET_USER,
  SET_IMAGE_USER,
  LOADING_UI,
  LOADING_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_FLASH_MESSAGE,
  LOADING_IMAGE,
  UNSET_FLASH_MESSAGE,
  SET_UNAUTH,
} from "../types";

const setAuthorization = (data) => {
  const iatiToken = `Bearer ${data.token}`;
  localStorage.setItem("iatiToken", JSON.stringify(data));
  axios.defaults.headers.common["Authorization"] = iatiToken;
};

export const login = (data, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  const { valid, errors } = loginValidation(data);
  if (!valid) {
    dispatch({ type: SET_ERRORS, payload: errors });
  } else {
    axios
      .post("/secured/login", data)
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS });
        const data = {
          token: res.data.token,
          userId: res.data.userId,
        };
        dispatch({ type: UNSET_FLASH_MESSAGE });
        setAuthorization(data);
        dispatch(getUserData(data.userId));
        history.push("/");
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          dispatch({
            type: SET_ERRORS,
            payload: {
              global: "Silahkan cek kembali email dan password",
            },
          });
        } else {
          dispatch({
            type: SET_ERRORS,
            payload: {
              global: "Something wrong",
            },
          });
        }
      });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("iatiToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTH });
  dispatch({ type: UNSET_FLASH_MESSAGE });
  window.location.href = "/";
};

export const getUserData = (id) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`/iati/user/v1/${id}/profile`)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
      console.log(res.data);

      dispatch(getImageUser(id));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getImageUser = (id) => (dispatch) => {
  dispatch({ type: LOADING_IMAGE });
  axios
    .get(`/iati/upload-file/getImage?userId=${id}`)
    .then((res) => {
      dispatch({
        type: SET_IMAGE_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_IMAGE_USER,
        payload: { status: err.response.status },
      });
    });
};

export const register = (data, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const { valid, errors } = registerValidation(data);

  if (!valid) {
    dispatch({ type: SET_ERRORS, payload: errors });
  } else {
    const dataRegister = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    axios
      .post("/secured/register", dataRegister)
      .then(() => {
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
          type: SET_FLASH_MESSAGE,
          payload: "Berhasil menambahkan user baru",
          status: "register",
        });
        history.push("/login");
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          dispatch({
            type: SET_ERRORS,
            payload: {
              global: "Email sudah ada, silahkan gunakan yang lain",
            },
          });
        }
      });
  }
};

export const editPorfile = (data, close) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const { errors, valid } = editProfileValidate(data);
  if (!valid) {
    dispatch({
      type: SET_ERRORS,
      payload: errors,
    });
  } else {
    let edit = {
      id: data.userId,
      username: data.username,
      password: data.password,
    };
    axios
      .post("/iati/user/v1/profile/update ", edit)
      .then(() => {
        close();
        dispatch({ type: CLEAR_ERRORS });
        dispatch(getUserData(data.userId));
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: {
            global: "Something wrong",
          },
        });
      });
  }
};

export const uploadImage = (image, userId) => (dispatch) => {
  dispatch({ type: LOADING_IMAGE });
  axios
    .post(`/iati/upload-file/request?userId=${userId}`, image)
    .then(() => {
      dispatch(getImageUser(userId));
      alert("Image berhasil dirubah");
    })
    .catch((err) => {
      alert("Something wrong");
    });
};

export const verifyemail = (data, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  if (data.verifyCode.trim() === "") {
    dispatch({
      type: SET_ERRORS,
      payload: { verify: "Tidak boleh kosong" },
    });
  } else {
    axios
      .post("/iati/validate/send", data)
      .then((res) => {
        dispatch(getUserData(data.id));
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: { verify: "OTP Salah, silahkan cek kembali" },
        });
      });
  }
};

export const resendOtp = (id_user) => (dispatch) => {
  axios
    .get(`/iati/verify/send/${id_user}`)
    .then(() => {
      alert("otp has been sent, please check your email!");
    })
    .catch((err) => {
      console.log(err);
    });
};
