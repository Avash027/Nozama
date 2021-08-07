import { useEffect } from "react";

const Login = ({
  setSignUpSelected,
  email,
  setEmail,
  password,
  setPassword,
  submitHandlerForLogin,
  history,
  signUpSelected,
  error,
  loading,
}) => {
  useEffect(() => {
    document.title = "Login | Nozama";
  }, []);

  return (
    <div>
      <div id="id01" className="modal">
        <span
          onClick={() => history.push("/")}
          className="close"
          title="Close Modal"
        >
          &times;
        </span>

        <form
          className="modal-content"
          onSubmit={(e) => submitHandlerForLogin(e)}
        >
          <button
            className="login-toggle"
            onClick={() => setSignUpSelected(!signUpSelected)}
          >
            {signUpSelected ? "Sign In instead" : "SignUp instead"}
          </button>

          <div className="signup-container">
            <h1>Sign In</h1>
            <p>Please fill in this form to create an account.</p>

            {error && (
              <div className="signup-error">Invalid email or password</div>
            )}

            <hr className="sign-up-hr" />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              className="sign-up-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              className="sign-up-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="clearfix">
              <button
                type="submit"
                className="signup button button-primary"
                style={{ width: "100%", marginBottom: "1rem" }}
              >
                {loading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Sign In"
                )}
              </button>

              <button
                type="button"
                onClick={() => history.push("/")}
                className="cancelbtn warning-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
