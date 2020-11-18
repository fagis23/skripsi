import React, { useState } from "react";
import FormStart from "../components/FormStart/FormStart";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { verifyemail, resendOtp } from "../redux/actions/action_user";

import { connect } from "react-redux";

const Verifyemail = (props) => {
  const classes = useStyles();

  const { email, id } = props.user.credentials;
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [count, setCount] = useState(false);
  let intervals;

  const { loading, error } = props.ui;
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const setCountdown = (timer) => {
    intervals = setInterval(() => {
      setTimer(timer--);
      setCount(true);
      if (timer < 0) {
        clearInterval(intervals);
        setCount(false);
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id,
      verifyCode: otp,
    };
    props.verifyemail(data, props.history);
  };

  const otpResended = (id) => {
    props.resendOtp(id);
    setCountdown(timer);
  };

  return (
    <FormStart>
      <Alert style={{ marginBottom: "1rem" }} severity="warning">
        Your email {email} has not been verified,
        <span className={classes.span}>
          {" "}
          open your email and insert the otp sent
        </span>
      </Alert>
      <div className={classes.header}>
        <h2>Verify Email</h2>
      </div>
      <div className={classes.forum}>
        <div>
          <input
            className="otp"
            type="text"
            value={otp}
            onChange={handleChange}
          />

          <div>
            <small style={{ color: "red" }}>{error && error.verify}</small>
          </div>
        </div>

        {loading ? (
          <span style={{ marginLeft: "1.5rem" }}>.......</span>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button className={classes.submit} onClick={handleSubmit}>
              Verify OTP
            </button>
            {count ? (
              <button
                className={classes.resendDisabled}
                onClick={() => otpResended(id)}
                disabled={count ? true : false}
              >
                Resent OTP
              </button>
            ) : (
              <button
                className={classes.resend}
                onClick={() => otpResended(id)}
              >
                Resent OTP
              </button>
            )}
          </div>
        )}
        {count && (
          <p style={{ textAlign: "center" }}>
            OTP is sent to your email, please wait {timer}s
          </p>
        )}
      </div>
    </FormStart>
  );
};
const useStyles = makeStyles({
  header: {
    width: "100%",
    color: "var(--mainColor)",
    marginBottom: "1.5rem",
  },
  forum: {
    width: "100%",
    "& .otp": {
      width: "95.5%",
      padding: "5px",
    },
  },
  submit: {
    width: "100%",
    background: "var(--mainColor)",
    border: "1px solid var(--mainColor)",
    padding: "6px 10px",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      background: "var(--darkColor)",
      border: "1px solid var(--darkColor)",
    },
  },
  resend: {
    width: "100%",
    marginLeft: "1rem",
    background: "var(--mainColor)",
    border: "1px solid var(--mainColor)",
    padding: "6px 10px",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      background: "var(--darkColor)",
      border: "1px solid var(--darkColor)",
    },
  },
  resendDisabled: {
    width: "100%",
    marginLeft: "1rem",
    background: "gray",
    border: "1px solid gray",
    padding: "6px 10px",
    borderRadius: "4px",
    color: "white",
    cursor: "not-allowed",
    outline: "none",
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionToProps = {
  verifyemail,
  resendOtp,
};

export default connect(mapStateToProps, mapActionToProps)(Verifyemail);
