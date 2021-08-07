import axios from "axios";
import {
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";

/***
 * @description : It sends a login request to server with email and password. If the credentials are correct
 * userInfo is added to global state else error message is throws
 * @arguments email password
 * @returns none
 * @async yes
 */

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: { Error: "User Login failed" },
    });
  }
};

/***
 * @description : It sends a signup request to server with email, password and name. If the credentials are correct
 * userInfo is added to global state else error message is throws
 * @arguments email password name
 * @returns none
 * @async yes
 */

export const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      name,
      email,
      password,
    };

    const { data } = await axios.post("/api/users/register", body, config);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: { Error: "User Login failed" },
    });
  }
};

/***
 * @description : Removes userInfo from the global state
 * @arguments none
 * @returns none
 * @async yes
 */

export const logout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });

  localStorage.setItem("userInfo", "");
};

/***
 * @description : It sends an update request to server with email, password,id,name. If the credentials are correct
 * then updated userInfo is added to global state else error message is throws
 * @arguments email password id name
 * @returns none
 * @async yes
 */

export const updateUser = (id, name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_EDIT_REQUEST,
    });

    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };

    const body = {
      _id: id,
      name,
      email,
      password,
    };

    const { data } = await axios.put("/api/users/profile", body, config);

    dispatch({
      type: USER_EDIT_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
      payload: { Error: "Error occured" },
    });
  }
};
