import {
  SET_COURSE_ADMIN,
  SET_MATERIAL_ADMIN,
  LOADING_COURSE_ADMIN,
  LOADING_MATERIAL_ADMIN,
  SET_ALL_ANSWER,
  UNSET_MATERIAL_ADMIN,
} from "../types";

const initialState = {
  course_admin: [],
  material_admin: [],
  loading_course: false,
  loading_material: false,
  all_answer: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSE_ADMIN:
      return {
        ...state,
        course_admin: action.payload,
        loading_course: false,
      };
    case SET_MATERIAL_ADMIN:
      return {
        ...state,
        material_admin: action.payload,
        loading_material: false,
      };
    case SET_ALL_ANSWER:
      return {
        ...state,
        all_answer: action.payload,
      };
    case UNSET_MATERIAL_ADMIN:
      return {
        ...state,
        material_admin: [],
      };
    case LOADING_COURSE_ADMIN:
      return {
        ...state,
        loading_course: true,
      };
    case LOADING_MATERIAL_ADMIN:
      return {
        ...state,
        loading_material: true,
      };
    default:
      return state;
  }
};

export default adminReducer;
