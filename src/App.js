import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { connect } from "react-redux";
import store from "./redux/store";
import axios from "./config/axios";
import { getUserData } from "./redux/actions/action_user";

import "./App.css";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Scoring from "./pages/Scoring";
import PageAllCourse from "./pages/PageAllCourse";
import PageSingleAvailableCourse from "./pages/PageSingleAvailableCourse";
import PageSingleMyCourse from "./pages/PageSingleMyCourse";
import PageSingleForum from "./pages/SingleForum";
import Verifyemail from "./pages/Verifyemail";
import Forum from "./pages/Forum";
import Assignment from "./pages/Assignment";
import Assesment from "./pages/Assesment";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import ErrorPage from "./pages/_error";

import CourseAdmin from "./pages/Admin/CourseAdmin";
import LSPAdmin from "./pages/Admin/LSPAdmin";

const App = (props) => {
  let token = null;

  if (localStorage.length !== 0) {
    token = JSON.parse(localStorage.getItem("iatiToken") || null);
  }

  useEffect(() => {
    document.title = "IATI";
    if (token !== null) {
      if (token.token) {
        const decodeToken = jwtDecode(token.token);
        if (decodeToken.exp * 2000 < Date.now()) {
          window.location.href = "/";
        } else {
          const headerToken = `Bearer ${token.token}`;
          axios.defaults.headers.common["Authorization"] = headerToken;
          store.dispatch(getUserData(token.userId));
        }
      }
    }
  }, []);

  const { authenticated, loading } = props.user;
  const { status, role } = props.user.credentials;

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : authenticated ? (
        status === "ADMIN" ? (
          <>
            <Navbar />
            <div
              style={{
                padding: "14vh 7.5rem 0 7.5rem",
              }}
            >
              <Switch>
                <Redirect from="/" to="/course" exact />
                <Route path="/course" component={CourseAdmin} exact />
                <Route path="/lsp" component={LSPAdmin} exact />
                <Route path="*" exact component={ErrorPage} />
              </Switch>
            </div>
            <Footer />
          </>
        ) : status !== "NOTVERIFIED" ? (
          <>
            <Navbar />
            <div
              style={{
                padding: "14vh 0 0 0",
              }}
            >
              <Switch>
                <Redirect from="/login" to="/" exact />
                <Redirect from="/verify" to="/" exact />
                <Redirect from="/register" to="/" exact />
                <Route path="/forum" component={Forum} exact />
                {role === "Lecturer" ? (
                  <Route path="/course" component={CourseAdmin} exact />
                ) : (
                  <Route path="/course" component={PageAllCourse} exact />
                )}

                <Route path="/assignment" component={Assignment} exact />
                <Route path="/assesment" component={Assesment} exact />
                <Route path="/scoring" component={Scoring} exact />
                <Route
                  path="/course/available/details"
                  component={PageSingleAvailableCourse}
                  exact
                />
                <Route
                  path="/course/my_course/details"
                  component={PageSingleMyCourse}
                  exact
                />
                <Route
                  path="/forum/details"
                  component={PageSingleForum}
                  exact
                />
                <Route path="/" component={Home} exact />
                <Route path="*" exact component={ErrorPage} />
              </Switch>
            </div>
            <Footer />
          </>
        ) : (
          <>
            <Switch>
              <Redirect from="/forum" to="/" exact />
              <Redirect from="/course" to="/" exact />
              <Redirect from="/schedule" to="/" exact />
              <Redirect from="/assignment" to="/" exact />
              <Redirect from="/assesment" to="/" exact />
              <Redirect from="/course/available/details" to="/" exact />
              <Redirect from="/course/my_course/details" to="/" exact />
              <Redirect from="/forum/details" to="/" exact />
              <Redirect from="/" to="/verify" exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/" component={Welcome} exact />
              <Route path="/verify" component={Verifyemail} exact />
              <Route path="*" exact component={ErrorPage} />
            </Switch>
          </>
        )
      ) : (
        <>
          <Switch>
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Welcome} exact />
          </Switch>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
