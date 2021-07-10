import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadable from "@loadable/component";
import { login, signup } from "../actions/userActions";

const SignUp = loadable(() =>
  import("../Components/SignUpFormElements/SignUp")
);
const Login = loadable(() => import("../Components/SignUpFormElements/Login"));

const SignUpForm = ({ history, location }) => {
  const [signUpSelected, setSignUpSelected] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userSignUp = useSelector((state) => state.userSignUp);

  const { loading, error, userInfo } = userLogin;
  const { loading: signUpLoading, error: signUpError } = userSignUp;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandlerForLogin = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const submitHandlerForSignUp = (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password));
  };

  let elemToBeRendered;

  if (signUpSelected) {
    elemToBeRendered = (
      <SignUp
        history={history}
        error={signUpError}
        location={location}
        loading={signUpLoading}
        name={name}
        setName={setName}
        signUpSelected={signUpSelected}
        setSignUpSelected={setSignUpSelected}
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        submitHandlerForSignUp={submitHandlerForSignUp}
      ></SignUp>
    );
  } else {
    elemToBeRendered = (
      <Login
        loading={loading}
        error={error}
        history={history}
        location={location}
        signUpSelected={signUpSelected}
        setSignUpSelected={setSignUpSelected}
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        submitHandlerForLogin={submitHandlerForLogin}
      />
    );
  }
  return <React.Fragment>{elemToBeRendered}</React.Fragment>;
};

export default SignUpForm;
