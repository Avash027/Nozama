import { useState } from "react";

const SignUp = ({
  signUpSelected,
  history,
  setSignUpSelected,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  submitHandlerForSignUp,
  loading,
  error,
}) => {
  const [isChecked, setIsChecked] = useState(false);

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

        <form className="modal-content" onSubmit={submitHandlerForSignUp}>
          <button
            className="login-toggle"
            onClick={() => setSignUpSelected(!signUpSelected)}
          >
            {signUpSelected ? "Sign In instead" : "SignUp instead"}
          </button>

          <div className="signup-container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>

            {error && <div className="signup-error">Email already in use</div>}

            <hr className="sign-up-hr" />

            <label htmlFor="Name">
              <b>Name</b>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
              name="name"
              className="sign-up-input"
              required
            />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              name="email"
              className="sign-up-input"
              required
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              name="psw"
              className="sign-up-input"
              required
            />

            <label>
              <input
                type="checkbox"
                defaultChecked={isChecked}
                name="remember"
                style={{ marginBottom: 15 }}
                onChange={() => setIsChecked(!isChecked)}
              />
              Remember me
            </label>

            <p>
              By creating an account you agree to our
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                style={{ color: "dodgerblue" }}
                target="__blank"
                rel="noreferrer"
              >
                Terms &amp; Privacy
              </a>
              .
            </p>

            <div className="clearfix">
              <button
                type="submit"
                className="signup button button-primary"
                style={{ width: "100%", marginBottom: "1rem" }}
                disabled={!isChecked}
              >
                {loading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Sign Up"
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

export default SignUp;
