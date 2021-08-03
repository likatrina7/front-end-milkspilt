import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const clientId =
  "1026535766157-ig1tqfrs60g2mp6jrb2d6htqoqt438l9.apps.googleusercontent.com";

const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log("newAuthRes:", newAuthRes);
    console.log("new auth token:", newAuthRes.id_token);
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

const Login = () => {
  const onSuccess = async (res) => {
    try {
      const userInfo = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          token: res.tokenId,
        }
      );
      refreshTokenSetup(res);
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
