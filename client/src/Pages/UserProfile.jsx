import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userActions";
import loadable from "@loadable/component";

const OrderPanel = loadable(() =>
  import("../Components/userProfileElements/OrderPanel")
);

const UserProfile = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userEdit = useSelector((state) => state.userEdit);

  const { userInfo } = userLogin;
  const { loading } = userEdit;

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repPass, setRepPass] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, history]);

  const updateUserHandler = () => {
    dispatch(updateUser(userInfo._id, Name, email, pass));
  };

  return (
    <div>
      <div className="user-profile">
        <div className="primary-heading">User Profile</div>

        <label htmlFor="nametag" className="user-profile-name-label">
          Name:
        </label>
        <br />
        <input
          type="text"
          className="user-profile-input"
          id="nametag"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <label htmlFor="emailtag" className="user-profile-email-label">
          Email:
        </label>
        <br />
        <input
          type="email"
          className="user-profile-input"
          id="emailtag"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <label htmlFor="passtag" className="user-profile-pass-label">
          New Password:
        </label>
        <br />
        <input
          type="password"
          className="user-profile-input"
          id="passtag"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <br />

        <label htmlFor="passreptag" className="user-profile-passrep-label">
          Repeat New Password:
        </label>
        <br />
        <input
          type="password"
          className="user-profile-input"
          id="passreptag"
          value={repPass}
          onChange={(e) => setRepPass(e.target.value)}
        />

        <br />

        <p style={{ marginBottom: "1rem", color: "red" }}>
          *In case you do not want to change the old password just retype it
        </p>

        <button
          className="button button-primary user-profile-button"
          onClick={(e) => updateUserHandler(e)}
          disabled={
            repPass !== pass ||
            pass.length === 0 ||
            email.length === 0 ||
            Name.length === 0
          }
        >
          {loading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            "Update Changes"
          )}
        </button>
      </div>

      <OrderPanel history={history}></OrderPanel>
    </div>
  );
};

export default UserProfile;
