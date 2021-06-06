import React from "react";
import { useHistory } from "react-router-dom";
import "./home.styles.scss";

const Home = () => {
  const history = useHistory();

  return (
    <div className={"home"}>
      <div className={"home-buttons container"}>
        <div
          className={"home-buttons__btn"}
          onClick={() => {
            history.push("/playlists");
          }}
        >
          My Playlists
        </div>
        <div
          className={"home-buttons__btn"}
          onClick={() => {
            history.push("/playlists/creator");
          }}
        >
          Playlist Generator
        </div>
      </div>
    </div>
  );
};
export default Home;
