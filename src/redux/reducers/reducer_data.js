import {
  SET_AVAILABLE_COURSE,
  SET_SINGLE_COURSE,
  SET_MY_COURSE,
  SET_FORUM,
  SET_SINGLE_FORUM,
  SET_STATUS,
  SET_LOADING_SINGLE_FORUM,
  SET_LOADING_FORUM,
  SET_LOADING_AVAILABLE_COURSE,
  SET_LOADING_SINGLE_COURSE,
  SET_LOADING_MY_COURSE,
  STATUS_UPLOAD,
} from "../types";

const initialState = {
  available_course: [],
  status_course: null,
  my_course: [],
  single_course: {},
  forum: [],
  single_forum: {},
  loading_forum: false,
  loading_single_forum: false,
  loading_available_course: false,
  loading_single_course: false,
  loading_my_course: false,
  status_upload: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AVAILABLE_COURSE:
      return {
        ...state,
        loading_available_course: false,
        available_course: action.payload,
      };
    case SET_SINGLE_COURSE:
      return {
        ...state,
        loading_single_course: false,
        single_course: action.payload,
      };
    case SET_MY_COURSE:
      return {
        ...state,
        loading_my_course: false,
        my_course: action.payload,
        single_course: {},
        status_course: null,
      };
    case SET_STATUS:
      return {
        ...state,
        status_course: action.payload,
      };
    case SET_FORUM:
      return {
        ...state,
        forum: action.payload,
        loading_forum: false,
        single_forum: {},
      };
    case SET_SINGLE_FORUM:
      return {
        ...state,
        single_forum: action.payload,
        loading_single_forum: false,
      };
    case SET_LOADING_SINGLE_FORUM:
      return {
        ...state,
        loading_single_forum: true,
      };
    case SET_LOADING_FORUM:
      return {
        ...state,
        loading_forum: true,
      };
    case SET_LOADING_AVAILABLE_COURSE:
      return {
        ...state,
        loading_available_course: true,
      };
    case SET_LOADING_SINGLE_COURSE:
      return {
        ...state,
        loading_single_course: true,
      };
    case SET_LOADING_MY_COURSE:
      return {
        ...state,
        loading_my_course: true,
      };
    case STATUS_UPLOAD:
      return {
        ...state,
        status_upload: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
