import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/reducer_user";
import dataReducer from "./reducers/reducer_data";
import uiReducer from "./reducers/reducer_ui";
import adminReducer from "./reducers/reducer_admin";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
  admin: adminReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
