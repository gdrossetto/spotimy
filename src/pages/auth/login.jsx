import React from "react";
import PageHeader from "../../components/page-header/page-header.component";

const Login = () => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&scope=${encodeURIComponent('playlist-modify-private playlist-modify-public user-top-read')}
&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
        <PageHeader title={'SpotiMy'} />
      <button className={"btn btn-green-outline d-block m-auto mt-5"} onClick={() => handleLogin()}>Login with Spotify</button>
    </div>
  );
};
export default Login;
