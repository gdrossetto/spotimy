import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPlaylists } from "../services/user.service";

const Playlists = () => {
  const user = useSelector((state) => state.user);
  const [playlists, setPlaylists] = useState([]);

  async function getPlaylists() {
    let myPlaylists = await getUserPlaylists();
    console.log(myPlaylists);
    setPlaylists(myPlaylists.items);
  }

  useEffect(() => {
    getPlaylists();
  }, [user]);

  return (
    <div>
      {user?.id ? <h1>{user?.display_name}'s playlists:</h1> : null}
      {playlists.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            {item.images.length > 0 ? (
              <img src={item.images[0].url} alt="" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
export default Playlists;
