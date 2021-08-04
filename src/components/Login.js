import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";

const clientId =
  "1026535766157-ig1tqfrs60g2mp6jrb2d6htqoqt438l9.apps.googleusercontent.com";

const Login = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  const onSuccess = async (res) => {
    try {
      const userInfo = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          token: res.tokenId,
        }
      );
      if (userInfo && userInfo.data && userInfo.data.current_user) {
        const userObj = userInfo.data.current_user;
        user.setName(userObj.username);
        user.setId(userObj.author_id);
        user.setEmail(userObj.email);
        user.setAvatar(userObj.avatar);
        history.push("/dashboard");
      }
    } catch (e) {
      console.log("Error:" + e);
      alert("Couldn't log in.");
    }
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login | Signup"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
