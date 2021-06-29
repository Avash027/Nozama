import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../actions/userActions";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import Error from "../Components/Error"

const SignUpForm = ({ history, location }) => {
  const [signUpSelected, setSignUpSelected] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  //TODO: Add loading and error
  const { loading, error, userInfo } = userLogin;

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
        error={error}
        location={location}
        loading={loading}
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
  return <React.Fragment>
          
        {elemToBeRendered}
          </React.Fragment>;
};

export default SignUpForm;
