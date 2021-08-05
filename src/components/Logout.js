import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import axios from "axios";
import { UserContext } from "../UserContext";
import "./Logout.css";

const clientId =
  "1026535766157-ig1tqfrs60g2mp6jrb2d6htqoqt438l9.apps.googleusercontent.com";

const Logout = () => {
  const user = useContext(UserContext);
  const userPic = user.avatar;
  const onSuccess = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/logout`
      );
      if (res && res.data && res.data.message == "Logged out successfully") {
        user.setName("");
        user.setId(null);
        user.setEmail("");
        user.setAvatar("");
      }
    } catch (e) {
      console.log("Error:" + e);
      alert("Couldn't log out.");
    }
  };

  return (
    <div className="logout-area">
      <img src={userPic} alt="User Picture"></img>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
};

export default Logout;
