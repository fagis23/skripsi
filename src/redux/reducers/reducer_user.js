import {
  SET_USER,
  SET_AUTH,
  SET_UNAUTH,
  LOADING_USER,
  SET_IMAGE_USER,
  LOADING_IMAGE,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  loading_img: false,
  imgProfile: "",
  credentials: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTH:
      return {
        ...state,
        authenticated: false,
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        credentials: action.payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_IMAGE_USER:
      return {
        ...state,
        loading_img: false,
        imgProfile: action.payload,
      };
    case LOADING_IMAGE:
      return {
        ...state,
        loading_img: true,
      };
    default:
      return state;
  }
};

export default userReducer;
