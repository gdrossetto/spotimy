import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Welcome, {user?.display_name}</h1>
      <button onClick={()=>{history.push('/playlists')}}>Minhas playlists</button>
    </div>
  );
};
export default Home;
