import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPlaylists } from "../../services/user.service";
import './playlist.styles.scss';

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
    <div className="playlists">
      {user?.id ? <h1>{user?.display_name}'s playlists:</h1> : null}
      <div className="playlists-list">
      {playlists.map((item) => {
        return (
          <div className="playlists-item" key={item.id}>
            {item.images.length > 0 ? (
              <img src={item.images[0].url} alt="" />
            ) : null}
            <div className="playlists-item__name">{item.name}</div>
          </div>
        );
      })}
      </div>
      
    </div>
  );
};
export default Playlists;
