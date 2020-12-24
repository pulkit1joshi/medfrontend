import { UPDATE_USER } from "./types";
import axios from "axios";

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com"

export const updateUser = (val) => (dispatch) => {
  const token = sessionStorage.getItem("medtoken");
  console.log("Updating user");
  if (token != null) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "auth-token": token,
    };
    axios
      .get(REACT_APP_base_url + "/api/p/profile", {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        val = {
          isLogged: true,
          userName: response.data.user2.firstname,
          userId: response.data.user.userid,
          email: response.data.user2.email,
          name: response.data.user.firstname,
          imageUrl: response.data.user.image,
        };
        dispatch({
          type: UPDATE_USER,
          payload: val,
        });
      });
  }
};

export const logoutUser = () => (dispatch) => {
  sessionStorage.setItem("medtoken", null);
  console.log("Updating user");
  //if (token != null) {
    console.log("Dispatching");
    let val = {
      isLogged: false,
      userName: "",
      userId: "",
      email: "",
      name: "",
      imageUrl: "",
    };
    dispatch({
      type: UPDATE_USER,
      payload: val,
    });
  //}
};
