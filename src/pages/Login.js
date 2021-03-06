import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/UserActions";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user, error } = userLogin;
  if(user){
    props.history.push('/')
  }
  const handleEmail = (e) => {
    if (e.target.value === "") {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
    } else {
      setEmail(e.target.value);
      setEmailError(false);
      setEmailErrorMessage("");
    }
  };
  const handlePassword = (e) => {
    if (e.target.value === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
    } else {
      setPassword(e.target.value);
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  };

  const handleLogin = () => {
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === "") {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
    }
    if (email !== "" && !emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Email is not valid");
    }
    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
    }
    if (emailError || passwordError) {
      return false;
    }
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (user) {
      props.history.push('/');
    }
  }, [props.history, user]);

  return (
    <Row className="no-gutter">
      <Col lg={3}></Col>
      <Col lg={9} md={12} sm={12} xs={12}>
        <Card
          style={{ margin: "4.95rem 5rem", width: "50%" }}
          className="loginCard"
        >
          {error && (
              <Typography
                className="danger"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {error}
              </Typography>
            )}
          <CardContent>
            <div>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                style={{ width: "100%" }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Email"
                onChange={handleEmail}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                style={{ width: "100%" }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Password"
                type="password"
                onChange={handlePassword}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOff />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", marginLeft: "1%", marginTop: "10px" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Link to="signup" className="signup">
                New User? Register Here
              </Link>
            </div>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Col>
      <style>
          {`
          .no-gutter {
            --bs-gutter-x: 0;
          }
          `}
      </style>
    </Row>
  );
}

export default Login;