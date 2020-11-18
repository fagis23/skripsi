import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  LOADING_UI,
} from "../types";

export const setLoadingUi = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
};

export const setError = (data) => (dispatch) => {
  dispatch({ type: SET_ERRORS, payload: data });
};
export const setMessage = (data) => (dispatch) => {
  dispatch({
    type: SET_FLASH_MESSAGE,
    payload: data.payload,
    status: data.status,
  });
};
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: UNSET_FLASH_MESSAGE });
};
