import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
} from "../types";

const initialState = {
  loading: false,
  error: "",
  flash: "",
  status: "",
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        flash: action.payload,
        status: action.status,
      };
    case UNSET_FLASH_MESSAGE:
      return {
        ...state,
        flash: "",
      };
    default:
      return state;
  }
};

export default uiReducer;
